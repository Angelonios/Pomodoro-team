import { React, useState, useEffect, useMemo } from 'react';
import { getMessage } from 'src/utils/pomodoroBotUtils';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { useAuth } from 'src/utils/auth';

export function PomodoroBotText() {
  const pomodoroState = usePomodoroState();
  const userState = useAuth();
  const [message, setMessage] = useState('Text');

  const memoizedPomodoroState = useMemo(() => pomodoroState, [
    pomodoroState.pomodoroTimerState,
  ]);

  useEffect(() => {
    setMessage(getMessage({ memoizedPomodoroState, userState }));
    console.log(memoizedPomodoroState);
    console.log(userState);
  }, [memoizedPomodoroState, userState]);

  return message;
}
