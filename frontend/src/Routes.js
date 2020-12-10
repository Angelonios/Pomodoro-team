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
import { ProfilePage } from 'src/pages/ProfilePage';
import { StatisticsPage } from 'src/pages/StatisticsPage';

export const route = {
  home: () => `/`,
  signUp: () => `/auth/signup`,
  afterSignUp: () => `/auth/aftersignup`,
  signIn: () => `/signin`,
  share: () => `/share/:shareId`,
  createTeam: () => `/teamform`,
  teamDetail: () => `/teamdetail/:teamId/:teamName`,
  profile: () => `/profile`,
  statistics: () => `/statistics`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signUp()} exact component={SignUp} />
      <Route path={route.afterSignUp()} exact component={AfterSignUp} />
      <Route path={route.signIn()} exact component={SignIn} />
      <Route path={route.share()} exact component={SharePage} />
      <Route path={route.createTeam()} exact component={CreateTeam} />
      <Route path={route.teamDetail()} exact component={TeamDetailPage} />
      <Route path={route.profile()} exact component={ProfilePage} />
      <Route path={route.statistics()} exact component={StatisticsPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
