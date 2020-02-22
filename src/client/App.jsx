import React, { useReducer } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import './App.less';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HeaderToolbar from './common/HeaderToolbar';
import AuthContext from './contexts/AuthContext';
import UserPage from './pages/UserPage/UserPage';
import localStorageService from './services/localStorageService';
import userReducer from './reducers/userReducer';

const App = () => {
  const [state, dispatch] = useReducer(userReducer, {
    user: localStorageService.getUser(),
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <HashRouter>
        <HeaderToolbar />
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/" component={UserPage} />
        </Switch>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
