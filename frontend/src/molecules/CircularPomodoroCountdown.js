import React from 'react';

import { usePomodoroState } from 'src/utils/PomodoroContext';

import { Box, CircularProgress } from '@material-ui/core';
import { PomodoroTimerLabel } from 'src/atoms';

export function CircularPomodoroCountdown() {
  const state = usePomodoroState();
  let progressValue = (state.remainingSeconds / state.maxSeconds) * 100;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" value={progressValue} size={300} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <PomodoroTimerLabel remainingTime={state.remainingSeconds} />
      </Box>
    </Box>
  );
}
