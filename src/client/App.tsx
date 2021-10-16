import React, { Reducer, useReducer } from 'react';

import { StylesProvider } from '@material-ui/core';
import { UserActionsType } from '@root/client/store/actions/actionsTypes';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import HeaderToolbar from './components/common/HeaderToolbar';
import AuthContext from './contexts/AuthContext';
import localStorageService from './services/localStorageService';
import userReducer, { UserReducerState } from './store/reducers/userReducer';
import './App.less';

const App = () => {
  const [state, dispatch] = useReducer<Reducer<UserReducerState, UserActionsType>>(userReducer, {
    isAuthenticated: false,
    user: localStorageService.getUser(),
  });

  return (
    <StylesProvider injectFirst>
      <AuthContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <HeaderToolbar />
          <Routes />
        </BrowserRouter>
      </AuthContext.Provider>
    </StylesProvider>
  );
};

export default App;
