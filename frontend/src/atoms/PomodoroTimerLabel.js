import React from 'react';
import { Typography } from '@material-ui/core';

import { convertSecondsToMinutesSting } from 'src/utils/pomodoroUtils';

export function PomodoroTimerLabel({ remainingSeconds, variant }) {
  const timeString = convertSecondsToMinutesSting(remainingSeconds);
  return (
    <Typography variant={variant} component="div" color="textSecondary">
      {timeString}
    </Typography>
  );
}
