import React from 'react';
import { Route, Switch } from 'react-router';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import ItemPage from './components/ItemPage/ItemPage';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/user" component={UserPage} />
    <Route exact path="/" component={UserPage} />
    <Route exact path="/item/:id" component={ItemPage} />
  </Switch>
);

export default Routes;
