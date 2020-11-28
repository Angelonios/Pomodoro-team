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
  timerStates,
} from 'src/utils/serverSync';
import {
  pomodoroReducer,
  CLICK_MAIN_BUTTON,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';

import { convertSecondsToMinutesSting } from 'src/utils/pomodoroUtils';
import { useAuth } from 'src/utils/auth';
import sound1 from 'src/assets/nuclear.mp3';
import useSound from 'use-sound';

const PomodoroStateContext = createContext();
const PomodoroDispatchContext = createContext();

export function PomodoroProvider({ children }) {
  const [communicationId, setCommunicationId] = useState('');
  const [shareId, setShareId] = useState('');
  const [shareUrl, setShareUrl] = useState();
  const serverPomodoro = useQuery(POMODORO_QUERY, { variables: { shareId } });
  const [updateMutation] = useMutation(UPDATE_POMODORO_MUTATION);
  const { user } = useAuth();
  const [userId, setUserId] = useState(0);
  const [play] = useSound(sound1, { volume: 0.5, playbackRate: 1.5 });

  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    finalTime: 0,
    position: 0,
    timerState: timerStates.idle,
  });

  const userPomodoroIds = useQuery(GET_USER_POMODORO_IDS, {
    variables: { user_id: userId },
    skip: !user,
  });

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

  useEffect(() => {
    if (user) {
      setUserId(user.user_id);
    }
  }, [user]);

  const clickMainButton = () => {
    dispatch({ type: CLICK_MAIN_BUTTON });

    //Prepare props for mutation
    let newTimerState, newPosition;
    if (
      state.timerState ===
      (timerStates.running || timerStates.paused || timerStates.offline)
    ) {
      newTimerState = timerStates.idle;
    } else {
      newTimerState = timerStates.running;
    }
    state.timerState === timerStates.running
      ? (newPosition = getNextIndex(state.position))
      : (newPosition = state.position);

    console.log(newTimerState);
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

  const cachedServerData = useMemo(() => {
    if (serverPomodoro.loading || serverPomodoro.error) {
      return null;
    }
    if (!user && serverPomodoro.data.pomodoro === null) {
      //If backend returns null, then we have to send mutation with new share and communication ids
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
    if (user && serverPomodoro.data.pomodoro === null) {
      //If backend returns null for a logged in user, it means error. TODO: handle error
      console.log('Error fetching pomodoro data for logged in user.');
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
    user,
  ]);
  const favicon = document.getElementById('favicon');
  useEffect(() => {
    let title = '';
    let faviconHref = '';
    if (state.timerState === timerStates.idle) {
      title = 'Idle - Team Pomodori';
      faviconHref = '/grey-tomato.svg';
    } else if (state.remainingSeconds < 0) {
      title =
        '(' +
        convertSecondsToMinutesSting(state.remainingSeconds) +
        ') ' +
        getPomodoroComponent(state.position).label +
        ' - ' +
        'Team Pomodori';
      faviconHref = '/red-tomato.svg';

      if (
        state.remainingSeconds % 300 === 0 &&
        state.timerState === timerStates.running
      ) {
        console.log(state.remainingSeconds);
        //play sound
        play();
      }
    } else {
      title = getPomodoroComponent(state.position).label + ' - Team Pomodori';
      if (Object.is(state.remainingSeconds, +0)) {
        console.log(state.remainingSeconds);
        //play sound
        play();
      }
      if (getPomodoroComponent(state.position).label === 'Break') {
        faviconHref = '/yellow-tomato.svg';
      } else {
        {
          faviconHref = '/green-tomato.svg';
        }
      }
    }
    console.log(faviconHref);
    favicon.href = faviconHref;
    document.title = title;
    if (state.timerState === timerStates.idle) return;
    const timer = setTimeout(() => {
      dispatch({ type: GET_REMAINING_SECONDS });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.timerState, state.remainingSeconds]);

  ////////////////////////////////////////////////////////////////
  // Perform these actions after first load / reload of the page
  ////////////////////////////////////////////////////////////////
  useEffect(() => {}, []);

  useEffect(() => {
    if (cachedServerData !== null) {
      dispatch({ type: SET_POMODORO_STATE, newState: cachedServerData });
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
