import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { PomodoroTimerLabel } from 'src/atoms';

export function CircularProgressBarWithLabel({ remainingTime, maxTime }) {
  let progressValue = (remainingTime / maxTime) * 100;
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
        <PomodoroTimerLabel remainingTime={remainingTime} />
      </Box>
    </Box>
  );
}
