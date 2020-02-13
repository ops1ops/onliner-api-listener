import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import './App.less';
import LoginPage from './components/LoginPage/LoginPage';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
