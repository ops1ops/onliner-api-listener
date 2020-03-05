import axios from 'axios';
import localStorageService from './localStorageService';

const getHeaders = () => ({
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

export const getItemById = (id) => axios.get(`/api/item/${id}`);

export const getCategories = () => axios
  .get('/api/categories');

export const getCategory = (categoryKey) => axios
  .get(`/api/categories/${categoryKey}`);

export const searchItems = (params) => axios
  .get('/api/search/items', { params: { query: params } });

export const subscribeUserToItem = (id) => axios
  .post(`/api/items/${id}/subscribe`, {}, { headers: getHeaders() });

export const unsubscribeUserFromItem = (id) => axios
  .post(`/api/items/${id}/unsubscribe`, {}, { headers: getHeaders() });
