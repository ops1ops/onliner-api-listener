import localStorageService from '@root/client/services/localStorageService';
import { CategoryType } from '@root/client/types/category';
import { SearchItemsType } from '@root/client/types/helpers';
import { ProductType } from '@root/client/types/product';
import { UserSubscriptionType, UserType } from '@root/client/types/user';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type GetCategoryItemsType = (categoryKey: string, pageNumber: number) => Promise<AxiosResponse>;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorageService.getToken()}`,
});

const axiosBaseConfig: AxiosRequestConfig = {
  baseURL: '/api/',
};

const apiInstance = axios.create(axiosBaseConfig);

export const registerUser = (name: string, email: string, password: string, confirmPassword: string) =>
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

export const getCategoryItems: GetCategoryItemsType = (categoryKey, pageNumber = 1) =>
  apiInstance.get<SearchItemsType>(`categories/${categoryKey}?page=${pageNumber}`, {
    headers: getAuthHeaders(),
  });

export const searchItems = (params: string) =>
  apiInstance.get<SearchItemsType>('search/items', {
    params: { query: params },
    headers: getAuthHeaders(),
  });

export const subscribeUserToItem = (id: string) =>
  apiInstance.post(`items/${id}/subscribe`, {}, { headers: getAuthHeaders() });

export const unsubscribeUserFromItem = (id: number) =>
  apiInstance.post(`items/${id}/unsubscribe`, {}, { headers: getAuthHeaders() });

export const getUserSubscriptions = () =>
  apiInstance.get<UserSubscriptionType[]>('user/subscriptions', { headers: getAuthHeaders() });
