import React from 'react';
import { Typography } from '@material-ui/core';

import { convertSecondsToMinutesString } from 'src/utils/pomodoroUtils';

export function PomodoroTimerLabel({ remainingSeconds, variant }) {
  const timeString = convertSecondsToMinutesString(remainingSeconds);
  return (
    <Typography
      variant={variant}
      component="div"
      color="textSecondary"
      style={{ fontWeight: 'bold' }}
    >
      {timeString}
    </Typography>
  );
}
