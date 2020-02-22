import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';

import LoginForm from './LoginForm';

const LoginPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/getUsername')
      .then((res) => res.json())
      .then(({ username }) => setUserName(username));
  }, []);

  return (
    <Container>
      {userName ? (
        <h1>{`Hello ${userName}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
