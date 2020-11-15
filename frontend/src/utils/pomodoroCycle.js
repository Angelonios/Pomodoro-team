const pomodoroCycleProps = {
  components: {
    pomodoro: {
      type: 1,
      seconds: 1500,
      label: 'Pomodoro',
      buttonText: 'Begin work',
      color: 'primary',
    },
    shortBreak: {
      type: 2,
      seconds: 300,
      label: 'Short break',
      buttonText: 'Take a break',
      color: 'secondary',
    },
    longBreak: {
      type: 3,
      seconds: 900,
      label: 'Long break',
      buttonText: 'Take a long break',
      color: 'secondary',
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
