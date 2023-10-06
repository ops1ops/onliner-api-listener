import React, {useLayoutEffect} from 'react';
import axios from "axios";
import { useHistory, Route, Switch } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ItemPage from './components/ItemPage/ItemPage';
import HomePage from './components/HomePage';
import UserItemsPage from './components/UserItemsPage';
import { HOME_PATH, ITEM_PATH, LOGIN_PATH, REGISTER_PATH, TRACKED_ITEMS, USER_ITEMS_PATH } from './constants/paths';
import TrackedItemsPage from './components/TrackedItemsPage';

const Routes = () => {
  const history = useHistory();

  useLayoutEffect(() => {
    axios.interceptors.response.use(
      undefined,
      (error) => {
        if (error?.response?.status === 401) {
          history.push(LOGIN_PATH);
        }

        return Promise.reject(error);
      },
    );
  }, []);

  return (
    <Switch>
      <Route exact path={LOGIN_PATH} component={LoginPage} />
      <Route exact path={REGISTER_PATH} component={RegisterPage} />
      <Route exact path={HOME_PATH} component={HomePage} />
      <Route exact path={ITEM_PATH} component={ItemPage} />
      <Route exact path={USER_ITEMS_PATH} component={UserItemsPage} />
      <Route exact path={TRACKED_ITEMS} component={TrackedItemsPage} />
    </Switch>
  );
};

export default Routes;
