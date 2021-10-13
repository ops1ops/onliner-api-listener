import { CategoryType } from '@root/client/types/category';
import { SearchItemsType } from '@root/client/types/helpers';
import { ProductType } from '@root/client/types/product';
import { UserType } from '@root/client/types/user';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import withRedirectToLoginPage from '../decorators/withRedirectToLoginPage';

import localStorageService from './localStorageService';

export type GetCategoryItemsType = (
  categoryKey: string,
  pageNumber: number,
) => Promise<AxiosResponse>;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorageService.getToken()}`,
});

const axiosBaseConfig: AxiosRequestConfig = {
  baseURL: '/api/',
};

const apiInstance = axios.create(axiosBaseConfig);

export const registerUser = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) =>
  apiInstance.post('users/create', {
    name,
    email,
    password,
    confirmPassword,
  });

export const loginUser = (login: string, password: string) =>
  apiInstance.post<UserType>('users/login', {
    login,
    password,
  });

export const getItemByKey = (id: string) => apiInstance.get<ProductType>(`item/${id}`);

export const getCategories = () => apiInstance.get<CategoryType[]>('categories');

export const getCategoryItems = withRedirectToLoginPage<GetCategoryItemsType>(
  (categoryKey, pageNumber = 1) =>
    apiInstance.get(`categories/${categoryKey}?page=${pageNumber}`, { headers: getAuthHeaders() }),
);

export const searchItems = withRedirectToLoginPage((params) =>
  apiInstance.get<SearchItemsType>('search/items', {
    params: { query: params },
    headers: getAuthHeaders(),
  }),
);

export const subscribeUserToItem = withRedirectToLoginPage((id) =>
  apiInstance.post(`items/${id}/subscribe`, {}, { headers: getAuthHeaders() }),
);

export const unsubscribeUserFromItem = withRedirectToLoginPage((id) =>
  apiInstance.post(`items/${id}/unsubscribe`, {}, { headers: getAuthHeaders() }),
);

export const getUserSubscriptions = withRedirectToLoginPage(() =>
  apiInstance.get('user/subscriptions', { headers: getAuthHeaders() }),
);
