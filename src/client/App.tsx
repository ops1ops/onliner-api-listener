import React, { useReducer } from "react";

import { createTheme, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { ContextType } from "@root/client/types/helpers";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import HeaderToolbar from "./components/common/HeaderToolbar";
import AuthContext from "./contexts/AuthContext";
import localStorageService from "./services/localStorageService";
import userReducer from "./store/reducers/userReducer";
import "./App.less";

const theme = createTheme({
  palette: {
    divider: "#551A8B",
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
