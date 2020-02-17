import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';

import './App.less';
import LoginScreen from './Screens/LoginScreen/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';

const App = () => (
  <div>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
