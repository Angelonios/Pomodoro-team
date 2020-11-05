import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  getPomodoroComponent,
  getComponentTypeOrderLength,
} from './pomodoroCycle';
import {
  initServerCommunication,
  POMODORO_QUERY,
  UPDATE_POMODORO_MUTATION,
} from './serverSync';
import { pomodoroReducer } from './pomodoroReducer';
import { useQuery, useMutation } from '@apollo/client';

const PomodoroStateContext = React.createContext();
const PomodoroDispatchContext = React.createContext();

export function PomodoroProvider({ children }) {
  const [finalTime, setFinalTime] = useState();
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [currentPositionInCycle, setCurrentPositionInCycle] = useState(0);
  const [communicationId, setCommunicationId] = useState('');
  const [shareId, setShareId] = useState('');
  const [shareUrl, setShareUrl] = useState();

  const [remainingSeconds, setRemainingSeconds] = React.useReducer(
    pomodoroReducer,
    getPomodoroComponent(currentPositionInCycle).seconds,
  );

  const serverPomodoro = useQuery(POMODORO_QUERY, { variables: { shareId } });
  const [updateMutation] = useMutation(UPDATE_POMODORO_MUTATION);

  ////////////////////////////
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
  );

  const cachedServerData = useMemo(() => {
    if (serverPomodoro.loading || serverPomodoro.error) return null;
    if (serverPomodoro.data.pomodoro === null) {
      //If backend returns null, then we have to initialize timer in order to send mutation with new share and communication ids
      initializeTimer({
        position: 0,
        running: false,
        secondsSinceStart: 0,
      });
    }
    //return query result here
    return serverPomodoro.data;
  }, [
    serverPomodoro.loading,
    serverPomodoro.error,
    serverPomodoro.data,
    initializeTimer,
  ]);

  ////////////////////////////////////////////////////////////////////
  // Perform these actions every time a user clicks on the main button
  ////////////////////////////////////////////////////////////////////
  const switchPomodoroRunningState = () => {
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
        secondsSinceStart: 0,
      });
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // Calculates final time from seconds in current pomodoro component and seconds since start
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const calculateFinalTime = (secondsInComponent, secondsSinceStart) => {
    return parseInt(
      Date.now() / 1000 + (secondsInComponent - secondsSinceStart),
    );
  };

  ////////////////////////////////////////////////////////////////
  // Returns next index in pomodoro cycle
  ////////////////////////////////////////////////////////////////
  const nextIndex = () => {
    if (currentPositionInCycle + 1 === getComponentTypeOrderLength()) {
      return 0;
    } else {
      return currentPositionInCycle + 1;
    }
  };

  ////////////////////////////////////////////////////////////////
  // If timer === running, refresh remaining seconds every second
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (!pomodoroRunning) return;
    const timer = setTimeout(() => {
      setRemainingSeconds({ finalTime: finalTime });
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
    console.log(cachedServerData);
    if (cachedServerData !== null) {
      if (cachedServerData.pomodoro !== null) {
        let position = parseInt(cachedServerData.pomodoro.position);
        let secondsSinceStart = cachedServerData.pomodoro.secondsSinceStart;
        if (secondsSinceStart === 0) {
          initializeTimer({
            position: position,
            running: false,
            secondsSinceStart: 0,
          });
        } else {
          initializeTimer({
            position: position,
            running: true,
            secondsSinceStart: secondsSinceStart,
          });
        }
      }
    }
  }, [cachedServerData, initializeTimer]);

  return (
    <PomodoroStateContext.Provider
      value={{
        remainingSeconds: remainingSeconds,
        pomodoroRunning: pomodoroRunning,
        maxSeconds: getPomodoroComponent(currentPositionInCycle).seconds,
        buttonText: getPomodoroComponent(currentPositionInCycle).buttonText,
        label: getPomodoroComponent(currentPositionInCycle).label,
        type: getPomodoroComponent(currentPositionInCycle).type,
        color: getPomodoroComponent(currentPositionInCycle).color,
        shareUrl: shareUrl,
      }}
    >
      <PomodoroDispatchContext.Provider value={switchPomodoroRunningState}>
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
