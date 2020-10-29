const pomodoroCycleProps = {
  components: {
    pomodoro: {
      type: 1,
      seconds: 1500,
      label: 'Pomodoro',
      buttonText: 'Begin work',
    },
    shortBreak: {
      type: 2,
      seconds: 300,
      label: 'Short break',
      buttonText: 'Take a break',
    },
    longBreak: {
      type: 3,
      seconds: 900,
      label: 'Long break',
      buttonText: 'Take a long break',
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
  console.log(componentsOrder[index]);
  return componentsOrder[index];
};

export const getComponentTypeOrderLength = () => {
  return componentsOrder.length;
};
