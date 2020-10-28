import React from 'react';

import {
  usePomodoroDispatch,
  usePomodoroState,
} from 'src/utils/PomodoroContext';

import { Button } from '@material-ui/core';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';

export function PomodoroTimerButton({ text, size }) {
  const dispatch = usePomodoroDispatch();
  const state = usePomodoroState();

  const getStartIcon = () => {
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
  };

  return (
    <Button
      startIcon={getStartIcon()}
      variant="contained"
      color="primary"
      size={size}
      onClick={() => dispatch()}
    >
      {state.buttonText}
    </Button>
  );
}
