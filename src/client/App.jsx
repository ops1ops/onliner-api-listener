import React, { useReducer } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import './App.less';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HeaderToolbar from './common/HeaderToolbar';
import AuthContext from './contexts/AuthContext';
import UserPage from './pages/UserPage/UserPage';


const reducer = (state, { type, payload: user }) => {
  switch (type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    user: JSON.parse(localStorage.getItem('user')),
    //TODO add LS service
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
