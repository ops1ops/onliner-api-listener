import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import './App.less';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
