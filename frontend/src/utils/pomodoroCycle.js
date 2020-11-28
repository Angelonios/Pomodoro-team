const actions = {
  switchToNext: { label: 'Finish', icon: 'flag' },
  switchToPomodoro: {
    label: 'Begin work',
  },
  switchToShortBreak: {
    label: 'Take a break',
  },
  switchToLongBreak: {
    label: 'Take a long break',
  },
  start: { icon: 'play' },
  pause: { icon: 'pause' },
  resume: { icon: 'play' },
  restart: { icon: 'restart' },
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
        idle: {
          primary: actions.start,
          secondary: (actions.switchToShortBreak, actions.switchToLongBreak),
        },
        running: {
          primary: actions.switchToNext,
          pause: actions.pause,
          restart: actions.restart,
        },
        paused: {
          primary: actions.switchToNext,
          resume: actions.resume,
          restart: actions.restart,
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
        idle: {
          primary: actions.start,
          secondary: (actions.switchToPomodoro, actions.switchToLongBreak),
        },
        running: {
          primary: actions.switchToNext,
          pause: actions.pause,
          restart: actions.restart,
        },
        paused: {
          primary: actions.switchToNext,
          resume: actions.resume,
          restart: actions.restart,
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
        idle: {
          primary: actions.start,
          secondary: (actions.switchToPomodoro, actions.switchToShortBreak),
        },
        running: {
          primary: actions.switchToNext,
          pause: actions.pause,
          restart: actions.restart,
        },
        paused: {
          primary: actions.switchToNext,
          resume: actions.resume,
          restart: actions.restart,
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
