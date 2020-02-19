import React, { useEffect, useState } from 'react';

import ReactImage from '../../assets/react.png';
import LoginForm from './LoginForm';

const LoginPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/getUsername')
      .then((res) => res.json())
      .then(({ username }) => setUserName(username));
  }, []);

  return (
    <div>
      {userName ? (
        <h1>{`Hello ${userName}`}</h1>
      ) : (
        <h1>Loading.. please wait!</h1>
      )}
      <LoginForm />
      <img src={ReactImage} alt="react" />
    </div>
  );
};

export default LoginPage;
