import React from 'react';

import {
  usePomodoroDispatch,
  usePomodoroState,
} from 'src/utils/PomodoroContext';

import { Button } from '@material-ui/core';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import FlagIcon from '@material-ui/icons/Flag';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';

export function PomodoroTimerButton({ text, size }) {
  const dispatch = usePomodoroDispatch();
  const state = usePomodoroState();

  const getStartIcon = () => {
    if (state.pomodoroRunning) {
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
  state.pomodoroRunning
    ? (buttonText = 'Finish')
    : (buttonText = state.buttonText);

  return (
    <Button
      startIcon={getStartIcon()}
      variant="contained"
      color="primary"
      size={size}
      onClick={() => dispatch()}
    >
      {buttonText}
    </Button>
  );
}
