import { getPomodoroComponent, getNextIndex } from 'src/utils/pomodoroCycle';
import { timerStates } from 'src/utils/serverSync';

export const CLICK_MAIN_BUTTON = 'CLICK_MAIN_BUTTON';
export const GET_REMAINING_SECONDS = 'GET_REMAINING_SECONDS';
export const SET_POMODORO_STATE = 'SET_POMODORO_STATE';
export const PAUSE = 'PAUSE';
export const RESUME = 'RESUME';

///////////////////////////////////////////////////////////////////////////////////////////////
// Calculates final time from seconds in current pomodoro component and seconds since start
///////////////////////////////////////////////////////////////////////////////////////////////
const calculateFinalTime = (state) => {
  const secondsInComponent = getPomodoroComponent(state.position).seconds;
  const secondsSinceStart = state.secondsSinceStart;
  return parseInt(Date.now() / 1000 + (secondsInComponent - secondsSinceStart));
};

const calculateRemainingSeconds = (state) => {
  return parseInt(state.finalTime - Date.now() / 1000 + 1);
};

// Basic actions
const clickMainButton = (state) => {
  if (
    state.timerState === timerStates.running ||
    state.timerState === timerStates.paused
  ) {
    const updatedState = {
      ...state,
      position: getNextIndex(state.position),
      timerState: timerStates.idle,
      secondsSinceStart: 0,
    };
    return {
      ...updatedState,
      remainingSeconds: getPomodoroComponent(updatedState.position).seconds,
    };
  }
  const updatedState = {
    ...state,
    timerState: timerStates.running,
    secondsSinceStart: 1,
  };
  state.finalTime = calculateFinalTime(updatedState);
  return {
    ...updatedState,
    remainingSeconds: calculateRemainingSeconds(state),
    finalTime: state.finalTime,
  };
};

const getRemainingSeconds = (state) => {
  return {
    ...state,
    remainingSeconds: calculateRemainingSeconds(state),
  };
};

const setPomodoroState = (state, newState) => {
  console.log('newStateInReducer', newState);
  const updatedState = {
    position: parseInt(newState.position),
    secondsSinceStart: newState.secondsSinceStart,
    timerState: newState.state,
  };
  if (newState.state === timerStates.idle) {
    return {
      ...updatedState,
      remainingSeconds: getPomodoroComponent(updatedState.position).seconds,
    };
  }
  if (newState.state === timerStates.paused) {
    console.log(updatedState.secondsSinceStart);
    return {
      ...updatedState,
      remainingSeconds:
        getPomodoroComponent(updatedState.position).seconds -
        updatedState.secondsSinceStart,
    };
  }
  state.finalTime = calculateFinalTime(updatedState);
  return {
    ...updatedState,
    remainingSeconds: calculateRemainingSeconds(state),
    finalTime: state.finalTime,
  };
};

export function pomodoroReducer(state, action) {
  switch (action.type) {
    case CLICK_MAIN_BUTTON:
      return clickMainButton(state);
    case GET_REMAINING_SECONDS:
      return getRemainingSeconds(state);
    case SET_POMODORO_STATE:
      return setPomodoroState(state, action.newState);
    default:
      return state;
  }
}
