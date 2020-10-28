import React, { useState, useEffect } from 'react';
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

const pomodoroCycle = {
  components: {
    pomodoro: {
      seconds: 1500,
      label: 'Pomodoro',
      positionInCycle: [1, 3, 5, 7],
    },
    shortBreak: {
      seconds: 300,
      label: 'Short break',
      positionInCycle: [2, 4, 6],
    },
    longBreak: {
      seconds: 900,
      label: 'Long break',
      positionInCycle: [8],
    },
  },
  totalPositions: 8,
};

const PomodoroStateContext = React.createContext();
const PomodoroDispatchContext = React.createContext();

function pomodoroReducer(state, props) {
  return props.finalTime - parseInt(Date.now() / 1000);
}

export function PomodoroProvider({ children }) {
  const [finalTime, setFinalTime] = useState();
  const [pomodoroRunning, setPomodoroRunning] = useState(false);

  const [remainingSeconds, setRemainingSeconds] = React.useReducer(
    pomodoroReducer,
    {},
  );

  //If pomodoroRunning is changed and set to true, then set FinalTime
  useEffect(() => {
    if (!pomodoroRunning) return;
    console.log('effect');
    if (remainingSeconds < pomodoroCycle.components.pomodoro.seconds) {
      setFinalTime(parseInt(Date.now() / 1000 + remainingSeconds));
    } else {
      setFinalTime(
        parseInt(Date.now() / 1000 + pomodoroCycle.components.pomodoro.seconds),
      );
    }
  }, [pomodoroRunning]);

  //Timer to refresh
  useEffect(() => {
    if (!pomodoroRunning) return;
    const timer = setTimeout(() => {
      setRemainingSeconds({ finalTime: finalTime });
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    console.log('PomodoroProvider: ' + remainingSeconds),
    (
      <PomodoroStateContext.Provider value={remainingSeconds}>
        <PomodoroDispatchContext.Provider value={setPomodoroRunning}>
          {children}
        </PomodoroDispatchContext.Provider>
      </PomodoroStateContext.Provider>
    )
  );
}

export function usePomodoroState() {
  const context = React.useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroState must be used within a PomodoroProvider');
  }
  return context;
}

export function usePomodoroDispatch() {
  const context = React.useContext(PomodoroDispatchContext);
  if (context === undefined) {
    throw new Error(
      'usePomodoroDispatch must be used within a PomodoroProvider',
    );
  }
  return context;
}
