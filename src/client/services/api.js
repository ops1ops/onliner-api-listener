import axios from 'axios';

import localStorageService from './localStorageService';
import withRedirectToLoginPage from '../decorators/withRedirectToLoginPage';

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorageService.getToken()}`,
});

export const registerUser = (name, email, password, confirmPassword) => axios
  .post('/api/users/create', {
    name,
    email,
    password,
    confirmPassword,
  });

export const loginUser = (login, password) => axios
  .post('/api/users/login', {
    login,
    password,
  });

export const getItemByKey = (id) => axios.get(`/api/item/${id}`);

export const getCategories = () => axios
  .get('/api/categories');

export const getCategoryItems = withRedirectToLoginPage((categoryKey, pageNumber = 1) => axios
  .get(`/api/categories/${categoryKey}?page=${pageNumber}`, { headers: getAuthHeaders() }));

export const searchItems = withRedirectToLoginPage((params) => axios
  .get('/api/search/items', { params: { query: params }, headers: getAuthHeaders() }));

export const subscribeUserToItem = withRedirectToLoginPage((id) => axios
  .post(`/api/items/${id}/subscribe`, {}, { headers: getAuthHeaders() }));

export const unsubscribeUserFromItem = withRedirectToLoginPage((id) => axios
  .post(`/api/items/${id}/unsubscribe`, {}, { headers: getAuthHeaders() }));

export const getUserSubscriptions = withRedirectToLoginPage(() => axios
  .get('/api/user/subscriptions', { headers: getAuthHeaders() }));
