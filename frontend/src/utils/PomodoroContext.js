import React, { useState, useEffect, useMemo } from 'react';
import {
  getPomodoroComponent,
  getComponentTypeOrderLength,
} from './pomodoroCycle';
import { initServerCommunication } from './serverSync';
//
//  💡 New improved logic 27. 10. 👇
//  ===============================
//
//  On timer startup:
//  - get pomodoroTimes interval
//  - get current system time
//  - add pomodoroTimes interval to current system time  – to get final time
//  - save final time as a state using hooks
//  - send pomodoroTimes interval to the loading circle
//
//  While running
//  -Every second (useEffect):
//    - calculate remaining time ((final time) - (current system time)) and save it as a state using hooks
//    - send remaining time to the loading circle and its label
//
//  On timer pause:
//  - stop calculating remaining time – keep saved values
//
//  On timer resume:
//  - same as startup but with saved remaining time instead of the pomodoroTimes interval
//
//
//  Other tasks:
//  - Move pomodoro countdown timer logic to utils
//

const PomodoroStateContext = React.createContext();
const PomodoroDispatchContext = React.createContext();

function pomodoroReducer(state, props) {
  return props.finalTime - parseInt(Date.now() / 1000);
}

export function PomodoroProvider({ children }) {
  const [finalTime, setFinalTime] = useState();
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [
    currentPositionInpomodoroCycle,
    setCurrentPositionInpomodoroCycle,
  ] = useState(0);
  const [communicationId, setCommunicationId] = useState();
  const [shareId, setShareId] = useState();
  const [shareUrl, setShareUrl] = useState();

  const memoizedPomodoroComponent = useMemo(
    () => getPomodoroComponent(currentPositionInpomodoroCycle),
    [currentPositionInpomodoroCycle],
  );

  const [remainingSeconds, setRemainingSeconds] = React.useReducer(
    pomodoroReducer,
    memoizedPomodoroComponent.seconds,
  );

  const switchPomodoroRunningState = () => {
    pomodoroRunning ? setPomodoroRunning(false) : setPomodoroRunning(true);
  };

  //If pomodoroRunning is set to true
  useEffect(() => {
    if (!pomodoroRunning) {
      return;
    }
    setFinalTime(
      parseInt(Date.now() / 1000 + memoizedPomodoroComponent.seconds),
    );

    //When pomodoroRunning si changed to false (user clicked on the Finish button)
    return function cleanup() {
      currentPositionInpomodoroCycle + 1 === getComponentTypeOrderLength()
        ? setCurrentPositionInpomodoroCycle(0)
        : setCurrentPositionInpomodoroCycle(currentPositionInpomodoroCycle + 1);
    };
  }, [
    pomodoroRunning,
    memoizedPomodoroComponent,
    currentPositionInpomodoroCycle,
  ]);

  //If pomodoroRunning is set to false
  useEffect(() => {
    if (pomodoroRunning) {
      return;
    }
    setFinalTime(
      parseInt(Date.now() / 1000 + memoizedPomodoroComponent.seconds),
    );
    setRemainingSeconds({ finalTime: finalTime });
  }, [
    pomodoroRunning,
    memoizedPomodoroComponent,
    finalTime,
    currentPositionInpomodoroCycle,
  ]);

  //Timer to refresh
  useEffect(() => {
    if (!pomodoroRunning) return;
    const timer = setTimeout(() => {
      setRemainingSeconds({ finalTime: finalTime });
    }, 1000);
    return () => clearTimeout(timer);
  });

  //First load
  useEffect(() => {
    const ids = initServerCommunication();
    setCommunicationId(ids.communicationId);
    setShareId(ids.shareId);
  }, []);

  useEffect(() => {
    setShareUrl(window.location.origin.toString() + '/share/' + shareId);
  }, [shareId]);

  return (
    <PomodoroStateContext.Provider
      value={{
        remainingSeconds: remainingSeconds,
        pomodoroRunning: pomodoroRunning,
        maxSeconds: memoizedPomodoroComponent.seconds,
        buttonText: memoizedPomodoroComponent.buttonText,
        label: memoizedPomodoroComponent.label,
        type: memoizedPomodoroComponent.type,
        color: memoizedPomodoroComponent.color,
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

//const mockServerResponse = () => {};
