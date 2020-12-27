import React from 'react';
import { PomodoroStatistics, TopNavigation } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function StatisticsTemplate() {
  return (
    <>
      <PageTitle pageName="Statistics" />
      <TopNavigation />
      <PomodoroStatistics />
    </>
  );
}
