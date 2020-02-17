import React, { useEffect, useState } from 'react';

import RegisterForm from '../../components/RegisterForm';

const RegisterScreen = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch('/api/getUsername')
      .then((res) => res.json())
      .then(({ username }) => setUserName(username));
  }, []);

  return <RegisterForm />;
};

export default RegisterScreen;
