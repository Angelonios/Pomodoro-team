import { useEffect } from 'react';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { timerStates } from 'src/utils/serverSyncUtils';
import sound1 from 'src/assets/nuclear.mp3';
import useSound from 'use-sound';

export function AudioNotification() {
  const state = usePomodoroState();
  const [play] = useSound(sound1, { volume: 0.5, playbackRate: 1.5 });

  useEffect(() => {
    if (
      (state.remainingSeconds < 0 &&
        state.remainingSeconds % 300 === 0 &&
        state.pomodoroTimerState === timerStates.running) ||
      Object.is(state.remainingSeconds, +0)
    ) {
      //play sound
      play();
    }
  }, [state.remainingSeconds, state.pomodoroTimerState, play]);

  return null;
}
