import React from 'react';

import { Container } from '@mui/material';

import RegisterForm from './RegisterForm';

import './styles.css';

const RegisterPage = () => (
  <Container className="pageContent">
    <RegisterForm />
  </Container>
);

export default RegisterPage;
