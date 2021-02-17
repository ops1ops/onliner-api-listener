import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

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
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter path="/">
        <HeaderToolbar />
        <Routes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
