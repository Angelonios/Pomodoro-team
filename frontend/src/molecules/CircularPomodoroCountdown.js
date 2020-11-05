import React from 'react';

import { Box, CircularProgress } from '@material-ui/core';
import { PomodoroTimerLabel } from 'src/atoms';

export function CircularPomodoroCountdown({
  remainingSeconds,
  maxSeconds,
  color,
}) {
  let progressValue = 0;
  remainingSeconds >= 0
    ? (progressValue = (remainingSeconds / maxSeconds) * 100)
    : (progressValue = 0);
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        value={progressValue}
        size={300}
        color={color}
      />
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
        <PomodoroTimerLabel remainingSeconds={remainingSeconds} />
      </Box>
    </Box>
  );
}
