import axios from 'axios';

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

export const searchCategory = (params) => axios
  .get('/api/search/items', { params: { query: params } });
>>>>>>> added categories and category items for UserPage
