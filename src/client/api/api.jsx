import axios from 'axios';

export const registerUser = (name, email, password) => axios
  .post('/api/users/create', {
    name,
    email,
    password,
  });

export const loginUser = (login, password) => axios
  .post('/api/users/login', {
    login,
    password,
  });
