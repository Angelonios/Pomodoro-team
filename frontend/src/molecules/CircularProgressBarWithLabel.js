import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import { PomodoroTimerTime } from 'src/atoms';

export function CircularProgressBarWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
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
        <PomodoroTimerTime remainingTime={props.remainingTime} />
      </Box>
    </Box>
  );
}
