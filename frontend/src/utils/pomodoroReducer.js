import {
  getPomodoroComponent,
  getComponentTypeOrderLength,
} from 'src/utils/pomodoroCycle';

export const CLICK_MAIN_BUTTON = 'CLICK_MAIN_BUTTON';
export const GET_REMAINING_SECONDS = 'GET_REMAINING_SECONDS';
export const SET_POMODORO_STATE = 'SET_POMODORO_STATE';
let finalTime;

///////////////////////////////////////////////////////////////////////////////////////////////
// Calculates final time from seconds in current pomodoro component and seconds since start
///////////////////////////////////////////////////////////////////////////////////////////////
const calculateFinalTime = (state) => {
  const secondsInComponent = getPomodoroComponent(state.position).seconds;
  const secondsSinceStart = state.secondsSinceStart;
  return parseInt(Date.now() / 1000 + (secondsInComponent - secondsSinceStart));
};

const calculateRemainingSeconds = () => {
  return parseInt(finalTime - Date.now() / 1000);
};

////////////////////////////////////////////////////////////////
// Returns next index in pomodoro cycle
////////////////////////////////////////////////////////////////
const nextIndex = (state) => {
  if (state.position + 1 === getComponentTypeOrderLength()) {
    return 0;
  } else {
    return state.position + 1;
  }
};

/////////// Main functions

const clickMainButton = (state) => {
  if (state.running) {
    const updatedState = {
      ...state,
      position: nextIndex(state),
      running: false,
      secondsSinceStart: 0,
    };
    return {
      ...updatedState,
      remainingSeconds: getPomodoroComponent(updatedState.position).seconds,
    };
  } else {
    const updatedState = {
      ...state,
      running: true,
      secondsSinceStart: 0,
    };
    finalTime = calculateFinalTime(updatedState);
    return {
      ...updatedState,
      remainingSeconds: calculateRemainingSeconds(),
    };
  }
};

const getRemainingSeconds = (state) => {
  return {
    ...state,
    remainingSeconds: calculateRemainingSeconds(),
  };
};

const setPomodoroState = (state, newState) => {
  const updatedState = {
    position: parseInt(newState.position),
    secondsSinceStart: newState.secondsSinceStart,
  };
  if (newState.secondsSinceStart === 0) {
    return {
      ...updatedState,
      running: false,
      remainingSeconds: getPomodoroComponent(updatedState.position).seconds,
    };
  } else {
    finalTime = calculateFinalTime(updatedState);
    return {
      ...updatedState,
      running: true,
      remainingSeconds: calculateRemainingSeconds(),
    };
  }
};

export function pomodoroReducer(state, action) {
  switch (action.type) {
    case CLICK_MAIN_BUTTON:
      return clickMainButton(state);
    case GET_REMAINING_SECONDS:
      return getRemainingSeconds(state);
    case SET_POMODORO_STATE:
      return setPomodoroState(state, action.newState.pomodoro);
    default:
      return state;
  }
}
