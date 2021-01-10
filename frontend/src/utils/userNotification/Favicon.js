import { useEffect, useState } from 'react';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { timerStates, timerComponents } from 'src/utils/serverSyncUtils';

export function Favicon() {
  const state = usePomodoroState();
  const [faviconHref, setFaviconHref] = useState();
  const favicon = document.getElementById('favicon');

  useEffect(() => {
    if (
      state.pomodoroTimerState === timerStates.idle ||
      state.pomodoroTimerState === timerStates.offline
    ) {
      setFaviconHref('/grey-tomato.svg');
    } else if (state.remainingSeconds < 0) {
      setFaviconHref('/red-tomato.svg');
    } else {
      switch (state.type) {
        // Pomodoro
        case timerComponents.pomodoro:
          setFaviconHref('/green-tomato.svg');
          break;
        // Long or short break
        default:
          setFaviconHref('/yellow-tomato.svg');
      }
    }
  }, [state.pomodoroTimerState, state.type, state.remainingSeconds]);

  favicon.href = faviconHref;

  return null;
}
