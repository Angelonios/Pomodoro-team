import { React, useState, useEffect, useMemo } from 'react';
import { getMessage } from 'src/utils/pomodoroBotUtils';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { useAuth } from 'src/utils/auth';
import { useStatistics } from 'src/utils/UserStatistics';

export function PomodoroBotText() {
  const pomodoroState = usePomodoroState();
  const userState = useAuth();
  const userStatistics = useStatistics({ type: 'today' });
  const [message, setMessage] = useState('Text');

  const memoizedPomodoroState = useMemo(
    () => ({
      timerState: pomodoroState.pomodoroTimerState,
      componentType: pomodoroState.type,
    }),
    [pomodoroState.pomodoroTimerState, pomodoroState.type],
  );

  useEffect(() => {
    setMessage(getMessage({ memoizedPomodoroState, userState }));
    console.log(memoizedPomodoroState);
    console.log(userState);
    console.log(userStatistics);
  }, [memoizedPomodoroState, userState]);

  return message;
}
