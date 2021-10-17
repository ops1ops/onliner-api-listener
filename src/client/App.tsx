import React, { useReducer } from 'react';

import { createTheme, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import Routes from '@root/client/Routes';
import HeaderToolbar from '@root/client/components/common/HeaderToolbar';
import AuthContext from '@root/client/contexts/AuthContext';
import localStorageService from '@root/client/services/localStorageService';
import userReducer from '@root/client/store/reducers/userReducer';
import { ContextType } from '@root/client/types/helpers';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    divider: '#551A8B',
  },
});

const App = () => {
  const [state, dispatch] = useReducer<ContextType>(userReducer, {
    isAuthenticated: false,
    user: localStorageService.getUser(),
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <HeaderToolbar />
            <Routes />
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
