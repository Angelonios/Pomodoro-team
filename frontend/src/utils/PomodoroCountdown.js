//NOT READY YET

import { useState, useEffect } from 'react';

//Constants
//Pomodoro cycle: pom, short, pom, short, pom, short, pom, long

export function PomodoroCountdown() {
  const [
    currentPositionInPomodoroCycle,
    setCurrentPositionInPomodoroCycle,
  ] = useState(1);
  const [currentPomodoroComponent, setCurrentPomodoroComponent] = useState(
    pomodoroCycle.pomodoro,
  );

  // Running

  const setNextPositionInPomodoroCycle = () => {
    if (currentPositionInPomodoroCycle <= pomodoroCycle.totalPositions) {
      setCurrentPositionInPomodoroCycle(currentPositionInPomodoroCycle + 1);

      pomodoroCycle.components.forEach((component) => {
        console.log(component);
        if (
          component.positionInCycle.includes(currentPositionInPomodoroCycle)
        ) {
          setCurrentPomodoroComponent(component);
        }
      });

      if (
        pomodoroCycle.components.pomodoro.positionInCycle.includes(
          currentPositionInPomodoroCycle,
        )
      ) {
      }
    } else {
      setCurrentPositionInPomodoroCycle(1);
      setCurrentPomodoroComponent(pomodoroCycle.component.pomodoro);
    }
  };
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
}
