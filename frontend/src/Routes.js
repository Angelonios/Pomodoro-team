import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { SignUp } from 'src/pages/SignUp';
import { AfterSignUp } from 'src/pages/AfterSignUp';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignIn } from 'src/pages/SignIn';
import { SharePage } from 'src/pages/SharePage';
import { CreateTeam } from 'src/pages/CreateTeam';
import { TeamDetailPage } from 'src/pages/TeamDetailPage';

export const route = {
  home: () => `/`,
  signUp: () => `/auth/signup`,
  afterSignUp: () => `/auth/aftersignup`,
  signIn: () => `/signin`,
  share: () => `/share/:shareId`,
  createTeam: () => `/teamform`,
  teamDetail: () => `/teamdetail`,
};

export function Routes() {
  return (
    <Switch>
      debugger;
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signUp()} exact component={SignUp} />
      <Route path={route.afterSignUp()} exact component={AfterSignUp} />
      <Route path={route.signIn()} exact component={SignIn} />
      <Route path={route.share()} exact component={SharePage} />
      <Route path={route.createTeam()} exact component={CreateTeam} />
      <Route path={route.teamDetail()} exact component={TeamDetailPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
