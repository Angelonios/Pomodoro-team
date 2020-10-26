import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { SignUp } from 'src/pages/SignUp';
import { PageNotFound } from 'src/pages/PageNotFound';

export const route = {
  home: () => `/`,
  signUp: () => `/auth/signup`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signUp()} exact component={SignUp} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
