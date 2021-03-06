import React from 'react';

import { Box, CircularProgress, IconButton } from '@material-ui/core';
import { PomodoroTimerLabel } from 'src/atoms';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export function CircularPomodoroCountdown({
  remainingSeconds,
  maxSeconds,
  color,
  timeSize,
  circleSize,
  pauseControls,
  performAction,
}) {
  let progressValue =
    remainingSeconds >= 0 ? (remainingSeconds / maxSeconds) * 100 : 0;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="static"
        value={progressValue}
        size={circleSize}
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
        <PomodoroTimerLabel
          remainingSeconds={remainingSeconds}
          variant={timeSize}
        />
        {pauseControls ? (
          <Box position="absolute" bottom={60}>
            <IconButton
              aria-label="pause"
              onClick={() => {
                performAction({ type: 'pause' });
              }}
            >
              {pauseControls === 'pause' ? (
                <PauseIcon color={color} />
              ) : (
                <PlayArrowIcon color={color} />
              )}
            </IconButton>
          </Box>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
}
