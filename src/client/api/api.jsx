const registerUser = (name, email, password) => fetch('/api/users/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name,
    email,
    password,
  }),
}).then((response) => response.json());

export default registerUser;
