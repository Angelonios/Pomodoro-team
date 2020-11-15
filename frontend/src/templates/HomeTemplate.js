import React from 'react';
import { useEffect } from 'react';
import { PomodoroTimer, TopNavigation } from 'src/organisms';

export function HomeTemplate() {
  const title = '5:00' + ' ' + 'Break' + ' ' + 'Team Pomodori';
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      <TopNavigation />
      <PomodoroTimer />
    </>
  );
}
