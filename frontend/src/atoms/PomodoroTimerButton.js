import React from 'react';

import { Button } from '@material-ui/core';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import FlagIcon from '@material-ui/icons/Flag';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';

import {
  usePomodoroDispatch,
  usePomodoroState,
} from 'src/utils/PomodoroContext';

import { timerStates } from 'src/utils/serverSync';

export function PomodoroTimerButton({ text, size }) {
  const dispatch = usePomodoroDispatch();
  const state = usePomodoroState();

  const getStartIcon = () => {
    if (state.pomodoroTimerState === timerStates.running) {
      return <FlagIcon />;
    } else {
      switch (state.type) {
        case 1:
          return <PlayArrowTwoToneIcon />;
        case 2:
          return <FreeBreakfastTwoToneIcon />;
        case 3:
          return <FreeBreakfastTwoToneIcon />;
        default:
          return <PlayArrowTwoToneIcon />;
      }
    }
  };

  let buttonText = '';
  state.pomodoroTimerState === timerStates.running
    ? (buttonText = 'Finish')
    : (buttonText = state.buttonText);

  return (
    <Button
      startIcon={getStartIcon()}
      variant="contained"
      color={state.color}
      size={size}
      onClick={() => dispatch()}
    >
      {buttonText}
    </Button>
  );
}
