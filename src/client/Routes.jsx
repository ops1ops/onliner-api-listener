import React from 'react';
import { Route, Switch } from 'react-router';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemPage from './components/ItemPage/ItemPage';
import HomePage from './components/HomePage';
import UserItemsPage from './components/UserItemsPage';
import { HOME_PATH, ITEM_PATH, LOGIN_PATH, REGISTER_PATH, USER_ITEMS_PATH } from './constants/paths';

const Routes = () => (
  <Switch>
    <Route exact path={LOGIN_PATH} component={LoginPage} />
    <Route exact path={REGISTER_PATH} component={RegisterPage} />
    <Route exact path={HOME_PATH} component={HomePage} />
    <Route exact path={ITEM_PATH} component={ItemPage} />
    <Route exact path={USER_ITEMS_PATH} component={UserItemsPage} />
  </Switch>
);

export default Routes;
