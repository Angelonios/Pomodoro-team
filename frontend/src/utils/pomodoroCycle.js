//NOT READY YET
const pomodoroCycleParams = {
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
const componentTypeOrder = [
  pomodoroCycleParams.components.pomodoro,
  pomodoroCycleParams.components.shortBreak,
  pomodoroCycleParams.components.pomodoro,
  pomodoroCycleParams.components.shortBreak,
  pomodoroCycleParams.components.pomodoro,
  pomodoroCycleParams.components.shortBreak,
  pomodoroCycleParams.components.pomodoro,
  pomodoroCycleParams.components.longBreak,
];

export const getPomodoroComponent = (index) => {
  console.log(componentTypeOrder[index]);
  return componentTypeOrder[index];
};

export const getComponentTypeOrderLength = () => {
  return componentTypeOrder.length;
};
