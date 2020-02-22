import React, { useReducer } from 'react';
import { HashRouter } from 'react-router-dom';

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
      <HashRouter>
        <HeaderToolbar />
        <Routes />
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
