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
} from 'src/utils/serverSync';
import {
  pomodoroReducer,
  CLICK_MAIN_BUTTON,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';

import { convertSecondsToMinutesSting } from 'src/utils/pomodoroUtils';

const PomodoroStateContext = createContext();
const PomodoroDispatchContext = createContext();

export function PomodoroProvider({ children }) {
  const [communicationId, setCommunicationId] = useState('');
  const [shareId, setShareId] = useState('');
  const [shareUrl, setShareUrl] = useState();
  const serverPomodoro = useQuery(POMODORO_QUERY, { variables: { shareId } });
  const [updateMutation] = useMutation(UPDATE_POMODORO_MUTATION);

  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    position: 0,
    running: false,
  });

  const clickMainButton = () => {
    dispatch({ type: CLICK_MAIN_BUTTON });

    //Prepare props for mutation
    let running, position;
    running = !state.running;
    state.running
      ? (position = getNextIndex(state.position))
      : (position = state.position);

    //Send mutation with new values
    updateMutation({
      variables: {
        running: running,
        position: position,
        communicationId: communicationId,
        shareId: shareId,
      },
    });
  };

  const cachedServerData = useMemo(() => {
    if (serverPomodoro.loading || serverPomodoro.error) {
      return null;
    }
    if (serverPomodoro.data.pomodoro === null) {
      //If backend returns null, then we have to send mutation with new share and communication ids
      updateMutation({
        variables: {
          running: false,
          position: 0,
          communicationId: communicationId,
          shareId: shareId,
        },
      });
      return null;
    }
    //return query result here
    return serverPomodoro.data;
  }, [
    serverPomodoro.loading,
    serverPomodoro.error,
    serverPomodoro.data,
    communicationId,
    shareId,
    updateMutation,
  ]);

  useEffect(() => {
    let title = '';
    if (!state.running) {
      title = 'Idle' + ' - ' + 'Team Pomodori';
    } else if (state.remainingSeconds < 0) {
      title =
        '(' +
        convertSecondsToMinutesSting(state.remainingSeconds) +
        ') ' +
        getPomodoroComponent(state.position).label +
        ' - ' +
        'Team Pomodori';
    } else {
      {
        title =
          getPomodoroComponent(state.position).label + ' - ' + 'Team Pomodori';
      }
    }
    document.title = title;
    if (!state.running) return;
    const timer = setTimeout(() => {
      dispatch({ type: GET_REMAINING_SECONDS });
    }, 1000);
    return () => clearTimeout(timer);
  });

  ////////////////////////////////////////////////////////////////
  // Perform these actions after first load / reload of the page
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    const ids = initServerCommunication();
    setCommunicationId(ids.communicationId);
    setShareId(ids.shareId);
    setShareUrl(window.location.origin.toString() + '/share/' + ids.shareId);
  }, []);

  useEffect(() => {
    if (cachedServerData !== null) {
      dispatch({ type: SET_POMODORO_STATE, newState: cachedServerData });
    }
  }, [cachedServerData]);

  return (
    <PomodoroStateContext.Provider
      value={{
        remainingSeconds: state.remainingSeconds,
        pomodoroRunning: state.running,
        maxSeconds: getPomodoroComponent(state.position).seconds,
        buttonText: getPomodoroComponent(state.position).buttonText,
        label: getPomodoroComponent(state.position).label,
        type: getPomodoroComponent(state.position).type,
        color: getPomodoroComponent(state.position).color,
        shareUrl: shareUrl,
      }}
    >
      <PomodoroDispatchContext.Provider value={clickMainButton}>
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
