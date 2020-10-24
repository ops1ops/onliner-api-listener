import React from 'react';
import { Route, Switch } from 'react-router';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemPage from './components/ItemPage/ItemPage';
import HomePage from './components/HomePage';
import UserItemsPage from './components/UserItemsPage';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/user" component={HomePage} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/item/:key" component={ItemPage} />
    <Route exact path="/user/items" component={UserItemsPage} />
  </Switch>
);

export default Routes;
