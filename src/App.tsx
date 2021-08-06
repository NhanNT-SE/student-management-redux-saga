import { NotFound, PrivateRoute } from 'components/common';
import { AdminLayout } from 'components/layout';
import { LoginPage } from 'features/auth/pages/Login';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { rootHistory } from 'utils';
function App() {
  return (
    <Router history={rootHistory}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
