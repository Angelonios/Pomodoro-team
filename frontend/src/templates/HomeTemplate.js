import React from 'react';
import { PomodoroTimer, TopNavigation } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function HomeTemplate() {
  return (
    <>
      <PageTitle />
      <TopNavigation />
      <PomodoroTimer />
    </>
  );
}
