import React, { useReducer } from 'react';
import { HashRouter } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core';

import './App.less';
import HeaderToolbar from './components/common/HeaderToolbar';
import AuthContext from './contexts/AuthContext';
import localStorageService from './services/localStorageService';
import userReducer from './reducers/userReducer';
import Routes from './Routes';

const App = () => {
  const [state, dispatch] = useReducer(userReducer, {
    user: localStorageService.getUser(),
  });

  return (
    <StylesProvider injectFirst>
      <AuthContext.Provider value={{ state, dispatch }}>
        <HashRouter>
          <HeaderToolbar />
          <Routes />
        </HashRouter>
      </AuthContext.Provider>
    </StylesProvider>
  );
};

export default App;
