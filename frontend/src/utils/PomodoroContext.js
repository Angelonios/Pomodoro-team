import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  createContext,
} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getPomodoroComponent,
  getComponentTypeOrderLength,
} from 'src/utils/pomodoroCycle';
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
  };

  useEffect(() => {
    if (shareId !== '') {
      console.log({
        running: state.running,
        position: state.position,
        communicationId: communicationId,
        shareId: shareId,
      });

      updateMutation({
        variables: {
          running: state.running,
          position: state.position,
          communicationId: communicationId,
          shareId: shareId,
        },
      });
    }
  }, [state.running]);

  /* ////////////////////////////
  // Timer initialization
  ////////////////////////////
  const initializeTimer = useCallback(
    (props) => {
      setCurrentPositionInCycle(props.position);

      setPomodoroRunning(props.running);

      setFinalTime(
        calculateFinalTime(
          getPomodoroComponent(props.position).seconds,
          props.secondsSinceStart,
        ),
      );

      setRemainingSeconds({
        finalTime: calculateFinalTime(
          getPomodoroComponent(props.position).seconds,
          props.secondsSinceStart,
        ),
      });

      //console.log(updateMutation.data);
      // mutate data here

      updateMutation({
        variables: {
          running: props.running,
          position: props.position,
          communicationId: communicationId,
          shareId: shareId,
        },
      });
      // Here comes the mutation to the server
    },
    [shareId, communicationId, updateMutation],
  ); */

  const cachedServerData = useMemo(() => {
    if (serverPomodoro.loading || serverPomodoro.error) return null;
    if (serverPomodoro.data.pomodoro === null) {
      //If backend returns null, then we have to initialize timer in order to send mutation with new share and communication ids
      /*       initializeTimer({
        position: 0,
        running: false,
        secondsSinceStart: 0,
      }); */
    }
    //return query result here
    console.log(serverPomodoro);
    return serverPomodoro.data;
  }, [serverPomodoro.loading, serverPomodoro.error, serverPomodoro.data]);

  ////////////////////////////////////////////////////////////////////
  // Perform these actions every time a user clicks on the main button
  ////////////////////////////////////////////////////////////////////
  /*   const switchPomodoroRunningState = () => {
    if (pomodoroRunning) {
      initializeTimer({
        position: nextIndex(),
        running: false,
        secondsSinceStart: 0,
      });
    } else {
      initializeTimer({
        position: currentPositionInCycle,
        running: true,
        secondsSinceStart: 1,
      });
    }
  }; */

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Calculates final time from seconds in current pomodoro component and seconds since start
  ///////////////////////////////////////////////////////////////////////////////////////////////
  /*   const calculateFinalTime = (secondsInComponent, secondsSinceStart) => {
    return parseInt(
      Date.now() / 1000 + (secondsInComponent - secondsSinceStart),
    );
  };
 */
  ////////////////////////////////////////////////////////////////
  // Returns next index in pomodoro cycle
  ////////////////////////////////////////////////////////////////
  /*   const nextIndex = () => {
    if (currentPositionInCycle + 1 === getComponentTypeOrderLength()) {
      return 0;
    } else {
      return currentPositionInCycle + 1;
    }
  }; */

  ////////////////////////////////////////////////////////////////
  // If timer === running, refresh remaining seconds every second
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
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
    //handleServerConfiguration(3, 40);
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
