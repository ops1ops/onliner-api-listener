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
