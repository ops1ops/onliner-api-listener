import React from 'react';

import HomePage from '@root/client/components/HomePage';
import ItemPage from '@root/client/components/ItemPage/ItemPage';
import LoginPage from '@root/client/components/LoginPage';
import RegisterPage from '@root/client/components/RegisterPage';
import UserItemsPage from '@root/client/components/UserItemsPage';
import { Route, Switch } from 'react-router';

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
