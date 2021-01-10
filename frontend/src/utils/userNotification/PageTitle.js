import { usePomodoroState } from 'src/utils/PomodoroContext';
import { timerStates } from 'src/utils/serverSyncUtils';
import { convertSecondsToMinutesString } from 'src/utils/pomodoroUtils';

export function PageTitle({ pageName }) {
  const state = usePomodoroState();
  const websiteName = 'Team Pomodori';
  let title = '';

  const getDynamicPomodoroTitle = () => {
    let dynamicTitle;

    if (
      state.pomodoroTimerState === timerStates.idle ||
      state.pomodoroTimerState === timerStates.offline
    ) {
      dynamicTitle = 'Idle';
    } else if (state.remainingSeconds < 0) {
      dynamicTitle = `(${convertSecondsToMinutesString(
        state.remainingSeconds,
      )}) ${state.label}`;
    } else {
      dynamicTitle = state.label;
    }
    return dynamicTitle;
  };

  pageName
    ? (title = `${pageName} – ${websiteName}`)
    : (title = `${getDynamicPomodoroTitle()} – ${websiteName}`);

  document.title = title;
  return null;
}
