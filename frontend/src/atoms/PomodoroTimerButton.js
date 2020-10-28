import React from 'react';

import { usePomodoroDispatch } from 'src/utils/PomodoroContext';

import { Button } from '@material-ui/core';

export function PomodoroTimerButton({ text, size, startIcon }) {
  const dispatch = usePomodoroDispatch();
  return (
    <Button
      startIcon={startIcon}
      variant="contained"
      color="primary"
      size={size}
      onClick={() => dispatch()}
    >
      {text}
    </Button>
  );
}
