import React, { useState, useEffect } from 'react';
import {
  getPomodoroComponent,
  getComponentTypeOrderLength,
} from './pomodoroCycle';
import { initServerCommunication } from './ServerSync';
import { pomodoroReducer } from './pomodoroReducer';
import { gql, useQuery } from '@apollo/client';

const PomodoroStateContext = React.createContext();
const PomodoroDispatchContext = React.createContext();

export function PomodoroProvider({ children }) {
  const [finalTime, setFinalTime] = useState();
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [currentPositionInCycle, setCurrentPositionInCycle] = useState(0);
  const [communicationId, setCommunicationId] = useState();
  const [shareId, setShareId] = useState();
  const [shareUrl, setShareUrl] = useState();

  const [remainingSeconds, setRemainingSeconds] = React.useReducer(
    pomodoroReducer,
    getPomodoroComponent(currentPositionInCycle).seconds,
  );

  const POMODORO_QUERY = gql`
    query Pomodoro($shareId: String!) {
      pomodoros {
        position
        secondsSinceStart
      }
    }
  `;
  const serverPomodoro = useQuery(POMODORO_QUERY);

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

  ////////////////////////////
  // Timer initialization
  ////////////////////////////
  const initializeTimer = (props) => {
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

    // Here comes the mutation to the server
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
    console.log(serverPomodoro);
    //handleServerConfiguration(3, 40);
  }, []);

  ////////////////////////////////////////////////////////////////////
  // Convert timer configuration from server to initializeTimer props
  ////////////////////////////////////////////////////////////////////
  const handleServerConfiguration = (position, secondsSinceStart) => {
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
  };

  const sendDataToServer = () => {
    const UPDATE_POMODORO_MUTATION = gql`
    mutation UpdatePomodoro ($running: Boolean!, $position: Int!, $communicationId: String!, $shareId: String) {
      pomodoros (running: $running, position: $position) {
        running
        position
        ids (communicationId = $communicationId, shareId = $shareId) {
          communicationId
          shareId
        }
      }
    }
  `;
  };

  const getDataFromServer = () => {
    const POMODORO_QUERY = gql`
      query Pomodoro($shareId: String!) {
        pomodoros {
          position
          secondsSinceStart
        }
      }
    `;
    // return useQuery(POMODORO_QUERY);
  };

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
