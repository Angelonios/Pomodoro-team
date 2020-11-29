import { timerStates } from 'src/utils/serverSync';

const actions = {
  switchToNext: { label: 'Finish', icon: 'flag' },
  switchToPomodoro: {
    type: 'SWITCH_TO_POMODORO',
    label: 'Begin work',
  },
  switchToShortBreak: {
    type: 'SWITCH_TO_SHORT_BREAK',
    label: 'Take a break',
  },
  switchToLongBreak: {
    type: 'SWITCH_TO_LONG_BREAK',
    label: 'Take a long break',
  },
  restart: { type: 'RESTART', label: 'Restart' },
  start: { icon: 'play' },
  pause: { icon: 'pause' },
  resume: { icon: 'play' },
};

const pomodoroCycleProps = {
  components: {
    pomodoro: {
      type: 1,
      seconds: 1500,
      label: 'Work',
      buttonText: 'Begin work',
      color: 'primary',
      actions: {
        IDLE: {
          primary: actions.start,
          secondary: [actions.switchToShortBreak, actions.switchToLongBreak],
        },
        RUNNING: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.pause,
        },
        PAUSED: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.resume,
        },
      },
    },
    shortBreak: {
      type: 2,
      seconds: 300,
      label: 'Break',
      buttonText: 'Take a break',
      color: 'secondary',
      actions: {
        IDLE: {
          primary: actions.start,
          secondary: [actions.switchToPomodoro, actions.switchToLongBreak],
        },
        RUNNING: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.pause,
        },
        PAUSED: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.resume,
        },
      },
    },
    longBreak: {
      type: 3,
      seconds: 900,
      label: 'Break',
      buttonText: 'Take a long break',
      color: 'secondary',
      actions: {
        IDLE: {
          primary: actions.start,
          secondary: [actions.switchToPomodoro, actions.switchToShortBreak],
        },
        RUNNING: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.pause,
        },
        PAUSED: {
          primary: actions.switchToNext,
          secondary: [actions.restart],
          pauseControls: actions.resume,
        },
      },
    },
  },
};

const componentsOrder = [
  pomodoroCycleProps.components.pomodoro,
  pomodoroCycleProps.components.shortBreak,
  pomodoroCycleProps.components.pomodoro,
  pomodoroCycleProps.components.shortBreak,
  pomodoroCycleProps.components.pomodoro,
  pomodoroCycleProps.components.shortBreak,
  pomodoroCycleProps.components.pomodoro,
  pomodoroCycleProps.components.longBreak,
];

export const getPomodoroComponent = (index) => {
  return componentsOrder[index];
};

export const getComponentTypeOrderLength = () => {
  return componentsOrder.length;
};

export const getNextIndex = (currentIndex) => {
  if (currentIndex + 1 === getComponentTypeOrderLength()) {
    return 0;
  } else {
    return currentIndex + 1;
  }
};

export const getTimerStateFriendlyName = ({ timerState, position }) => {
  switch (timerState) {
    case timerStates.offline:
      return 'Offline';
    case timerStates.idle:
      return 'Idle';
    case timerStates.paused:
      return `${getPomodoroComponent(position).label} (paused)`;
    case timerStates.running:
      return getPomodoroComponent(position).label;
  }
};
