import React from 'react';
import { useEffect } from 'react';
import { PomodoroTimer, TopNavigation } from 'src/organisms';

export function HomeTemplate() {
  return (
    <>
      <TopNavigation />
      <PomodoroTimer />
    </>
  );
}
