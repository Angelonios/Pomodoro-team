import React from 'react';
import { Typography } from '@material-ui/core';

export function PomodoroTimerLabel({ remainingTime }) {
  let min = parseInt(remainingTime / 60);
  remainingTime = remainingTime % 60;
  let sec = parseInt(remainingTime);
  return (
    <Typography variant="h2" component="div" color="textSecondary">
      {min}m {sec}s
    </Typography>
  );
}
