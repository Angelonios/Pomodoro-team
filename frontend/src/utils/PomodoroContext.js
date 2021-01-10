import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  createContext,
} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getNextIndex, getPomodoroComponent } from 'src/utils/pomodoroCycle';
import {
  initServerCommunication,
  POMODORO_QUERY,
  UPDATE_POMODORO_MUTATION,
  GET_USER_POMODORO_IDS,
  SAVE_POMODORO_DURATION,
  timerStates,
  calcDuration,
  timerComponents,
} from 'src/utils/serverSyncUtils';
import {
  pomodoroReducer,
  CLICK_MAIN_BUTTON,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';

import { useAuth } from 'src/utils/auth';

const PomodoroStateContext = createContext();
const PomodoroDispatchContext = createContext();

export function PomodoroProvider({ children }) {
  // States
  const [communicationId, setCommunicationId] = useState('');
  const [shareId, setShareId] = useState('');
  const [shareUrl, setShareUrl] = useState();
  const [userId, setUserId] = useState(0);
  const { user } = useAuth();

  // Queries
  const serverPomodoro = useQuery(POMODORO_QUERY, { variables: { shareId } });
  const userPomodoroIds = useQuery(GET_USER_POMODORO_IDS, {
    variables: { user_id: userId },
    skip: !user,
  });

  // Mutations
  const [updateMutation] = useMutation(UPDATE_POMODORO_MUTATION);
  const [savePomodoroDuration] = useMutation(SAVE_POMODORO_DURATION);

  // Main reducer
  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    finalTime: 0,
    position: 0,
    timerState: timerStates.idle,
    taskName: '',
  });

  // Set communication and share IDs (used for communication with server)
  useEffect(() => {
    if (!userPomodoroIds.loading && !userPomodoroIds.error && user) {
      const ids = initServerCommunication(
        userPomodoroIds.data.userPomodoroIds.communication_id,
        userPomodoroIds.data.userPomodoroIds.share_id,
      );
      setCommunicationId(ids.communicationId);
      setShareId(ids.shareId);
      setShareUrl(window.location.origin.toString() + '/share/' + ids.shareId);
    } else if (!userPomodoroIds.loading && !user) {
      const ids = initServerCommunication();
      setCommunicationId(ids.communicationId);
      setShareId(ids.shareId);
      setShareUrl(window.location.origin.toString() + '/share/' + ids.shareId);
    }
  }, [userPomodoroIds, user]);

  // Set userId after login
  useEffect(() => {
    if (user) {
      setUserId(user.user_id);
    }
  }, [user]);

  // Determine what to do when user selects a secondary action (in dropdown submenu of the main button).
  const handleSecondaryActions = (index) => {
    let newTimerState = state.timerState;
    let newPosition = state.position;
    switch (
      getPomodoroComponent(state.position).actions[state.timerState].secondary[
        index
      ].type
    ) {
      case 'SWITCH_TO_POMODORO':
        newTimerState = timerStates.idle;
        newPosition = 0;

        return { newTimerState, newPosition };
      case 'SWITCH_TO_SHORT_BREAK':
        newTimerState = timerStates.idle;
        newPosition = 1;
        return { newTimerState, newPosition };
      case 'SWITCH_TO_LONG_BREAK':
        newTimerState = timerStates.idle;
        newPosition = 7;
        return { newTimerState, newPosition };
      case 'RESTART':
        newTimerState = timerStates.idle;
        newPosition = state.position;
        return { newTimerState, newPosition };
      default:
        console.log('Unknown action type!');
    }
  };

  // Perform action after user's button click based on action type and current pomodoro component
  // Types:
  //    primary: main button,
  //    secondary: items in dropdown submenu of the main button,
  //    pause: pause button
  const performAction = ({ type, index }) => {
    let newTimerState;
    let newPosition;
    switch (type) {
      case 'primary':
        dispatch({ type: CLICK_MAIN_BUTTON });
        if (
          state.timerState !== timerStates.idle &&
          state.timerState !== timerStates.offline
        ) {
          newTimerState = timerStates.idle;
          //Save pomodoro duration to statistics if component type is pomodoro and user is logged in
          getPomodoroComponent(state.position).type ===
            timerComponents.pomodoro &&
            user &&
            savePomodoroDuration({
              variables: {
                user_id: user.user_id,
                duration: calcDuration({
                  remainingSeconds: state.remainingSeconds,
                  pomodoroDuration: getPomodoroComponent(state.position)
                    .seconds,
                }),
              },
            });
        } else {
          newTimerState = timerStates.running;
        }
        state.timerState === timerStates.running ||
        state.timerState === timerStates.paused
          ? (newPosition = getNextIndex(state.position))
          : (newPosition = state.position);
        break;
      case 'secondary':
        ({ newTimerState, newPosition } = handleSecondaryActions(index));
        dispatch({
          type: SET_POMODORO_STATE,
          newState: {
            position: newPosition,
            state: newTimerState,
            secondsSinceStart: 0,
          },
        });
        break;
      case 'pause':
        newTimerState = timerStates.running;
        newPosition = state.position;
        let newSecondsSinceStart = state.secondsSinceStart;
        if (state.timerState !== timerStates.paused) {
          newTimerState = timerStates.paused;
          newSecondsSinceStart =
            getPomodoroComponent(state.position).seconds -
            state.remainingSeconds;
        }
        dispatch({
          type: SET_POMODORO_STATE,
          newState: {
            ...state,
            position: newPosition,
            state: newTimerState,
            secondsSinceStart: newSecondsSinceStart,
          },
        });
        break;
      default:
        newTimerState = state.timerState;
        newPosition = state.position;
        console.log('Unknown action category type!');
    }

    //Send mutation with new values
    updateMutation({
      variables: {
        state: newTimerState,
        position: newPosition,
        communicationId: communicationId,
        shareId: shareId,
      },
    });
  };

  // Memoized pomodoro data from server
  const cachedServerData = useMemo(() => {
    if (serverPomodoro.loading || serverPomodoro.error) {
      return null;
    }
    if (!user && serverPomodoro.data.pomodoro === null) {
      //If backend returns null, then we have to send mutation with new share and communication ids in order to create a new entry in DB
      updateMutation({
        variables: {
          state: timerStates.idle,
          position: 0,
          communicationId: communicationId,
          shareId: shareId,
        },
      });
      return null;
    }
    if (user && serverPomodoro.data?.pomodoro === null) {
      return null;
    }
    //Return query result here
    return serverPomodoro.data;
  }, [
    serverPomodoro.loading,
    serverPomodoro.error,
    serverPomodoro.data,
    communicationId,
    shareId,
    updateMutation,
    user,
  ]);

  // Refresh reducer state every second
  useEffect(() => {
    if (
      state.timerState === timerStates.idle ||
      state.timerState === timerStates.paused ||
      state.timerState === timerStates.offline
    )
      return;
    const timer = setTimeout(() => {
      dispatch({ type: GET_REMAINING_SECONDS });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.timerState, state.remainingSeconds, state.position]);

  // Set reducer state to the pomodoro data received from the server
  useEffect(() => {
    if (cachedServerData !== null) {
      dispatch({
        type: SET_POMODORO_STATE,
        newState: cachedServerData.pomodoro,
      });
    }
  }, [cachedServerData]);

  return (
    <PomodoroStateContext.Provider
      value={{
        remainingSeconds: state.remainingSeconds,
        pomodoroTimerState: state.timerState,
        maxSeconds: getPomodoroComponent(state.position).seconds,
        buttonText: getPomodoroComponent(state.position).buttonText,
        label: getPomodoroComponent(state.position).label,
        type: getPomodoroComponent(state.position).type,
        color: getPomodoroComponent(state.position).color,
        shareUrl: shareUrl,
        communicationId: communicationId,
        actions: getPomodoroComponent(state.position).actions[state.timerState],
        performAction: performAction,
        pauseControls: getPomodoroComponent(state.position).actions[
          state.timerState
        ].pauseControls?.icon,
        taskName: state.taskName ?? '',
      }}
    >
      <PomodoroDispatchContext.Provider value={dispatch}>
        {children}
      </PomodoroDispatchContext.Provider>
    </PomodoroStateContext.Provider>
  );
}

export const usePomodoroState = () => {
  const context = React.useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroState must be used within a PomodoroProvider');
  }
  return context;
};

export const usePomodoroDispatch = () => {
  const context = React.useContext(PomodoroDispatchContext);
  if (context === undefined) {
    throw new Error(
      'usePomodoroDispatch must be used within a PomodoroProvider',
    );
  }
  return context;
};
