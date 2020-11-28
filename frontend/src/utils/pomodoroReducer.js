import { getPomodoroComponent, getNextIndex } from 'src/utils/pomodoroCycle';
import { timerStates } from 'src/utils/serverSync';

export const CLICK_MAIN_BUTTON = 'CLICK_MAIN_BUTTON';
export const GET_REMAINING_SECONDS = 'GET_REMAINING_SECONDS';
export const SET_POMODORO_STATE = 'SET_POMODORO_STATE';

///////////////////////////////////////////////////////////////////////////////////////////////
// Calculates final time from seconds in current pomodoro component and seconds since start
///////////////////////////////////////////////////////////////////////////////////////////////
const calculateFinalTime = (state) => {
  const secondsInComponent = getPomodoroComponent(state.position).seconds;
  const secondsSinceStart = state.secondsSinceStart;
  return parseInt(Date.now() / 1000 + (secondsInComponent - secondsSinceStart));
};

const calculateRemainingSeconds = (state) => {
  return parseInt(state.finalTime - Date.now() / 1000);
};

// Basic actions
const clickMainButton = (state) => {
  if (state.timerState === timerStates.running) {
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
  } else {
    const updatedState = {
      ...state,
      timerState: timerStates.running,
      secondsSinceStart: 0,
    };
    state.finalTime = calculateFinalTime(updatedState);
    return {
      ...updatedState,
      remainingSeconds: calculateRemainingSeconds(state),
      finalTime: state.finalTime,
    };
  }
};

const getRemainingSeconds = (state) => {
  return {
    ...state,
    remainingSeconds: calculateRemainingSeconds(state),
  };
};

const setPomodoroState = (state, newState) => {
  const updatedState = {
    position: parseInt(newState.position),
    secondsSinceStart: newState.secondsSinceStart,
    isOffline: newState.isOffline,
  };
  if (newState.secondsSinceStart === 0) {
    return {
      ...updatedState,
      timerState: timerStates.idle,
      remainingSeconds: getPomodoroComponent(updatedState.position).seconds,
    };
  } else {
    state.finalTime = calculateFinalTime(updatedState);
    return {
      ...updatedState,
      timerState: timerStates.running,
      remainingSeconds: calculateRemainingSeconds(state),
      finalTime: state.finalTime,
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
