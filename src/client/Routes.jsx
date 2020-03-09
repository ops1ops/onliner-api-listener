import React from 'react';
import { Route, Switch } from 'react-router';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemPage from './components/ItemPage/ItemPage';
import UserPage from './components/UserPage';
import UserItemPage from './components/UserItemsPage';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/user" component={UserPage} />
    <Route exact path="/" component={UserPage} />
    <Route exact path="/item/:key" component={ItemPage} />
    <Route exact path="/user/items" component={UserItemPage} />
  </Switch>
);

export default Routes;
