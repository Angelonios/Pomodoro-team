import React from 'react';
import { PomodoroTimer, TopNavigation } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';
import { TaskForm } from 'src/organisms/TaskForm';

export function HomeTemplate() {
  return (
    <>
      <PageTitle />
      <TopNavigation />
      <PomodoroTimer />
    </>
  );
}
