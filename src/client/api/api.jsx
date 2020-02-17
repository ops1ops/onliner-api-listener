import axios from 'axios';

const registerUser = (name, email, password) => axios
  .post('/api/users/create', {
    name,
    email,
    password,
  });

export default registerUser;
