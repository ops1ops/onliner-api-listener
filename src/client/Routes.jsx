import React from 'react';
import { Route, Switch } from 'react-router';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemPage from './components/ItemPage/ItemPage';
import HomePage from './components/HomePage';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/user" component={HomePage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/item/:key" component={ItemPage} />
  </Switch>
);

export default Routes;
