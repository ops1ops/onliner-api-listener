import React from 'react';
import Container from '@material-ui/core/Container';
import RegisterForm from './RegisterForm';

import './styles.css';

const RegisterPage = () => (
  <Container className="form">
    <RegisterForm />
  </Container>
);

export default RegisterPage;
