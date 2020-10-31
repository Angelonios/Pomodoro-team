import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { SignUp } from 'src/pages/SignUp';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignIn } from 'src/pages/SignIn';
import { SharePage } from 'src/pages/SharePage';

export const route = {
  home: () => `/`,
  signUp: () => `/auth/signup`,
  signIn: () => `/signin`,
  share: (shareId) => `/share/` + shareId,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signUp()} exact component={SignUp} />
      <Route path={route.signIn()} exact component={SignIn} />
      <Route path={route.share()} exact component={SharePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
