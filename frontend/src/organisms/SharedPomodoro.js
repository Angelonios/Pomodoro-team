import React, { useEffect, useReducer } from 'react';

import { Container, Paper, Box, Grid } from '@material-ui/core';
import { getPomodoroComponent } from 'src/utils/pomodoroCycle';
import {
  pomodoroReducer,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';
import { CircularPomodoroCountdown, ShareUrl } from 'src/molecules';

export function SharedPomodoro({ serverPomodoro }) {
  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    position: 0,
    running: false,
  });

  useEffect(() => {
    if (!serverPomodoro.error && !serverPomodoro.loading) {
      if (serverPomodoro.data.pomodoro === null) {
        console.log('loading');
      } else {
        dispatch({ type: SET_POMODORO_STATE, newState: serverPomodoro.data });
      }
    }
  }, [serverPomodoro]);

  ////////////////////////////////////////////////////////////////
  // If timer === running, refresh remaining seconds every second
  ////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!state.running) return;
    const timer = setTimeout(() => {
      dispatch({ type: GET_REMAINING_SECONDS });
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <Container>
      <Box p={2}>
        <Grid
          container
          spacing={10}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xl={4} lg={4} xs={12} align="center">
            <CircularPomodoroCountdown
              remainingSeconds={state.remainingSeconds}
              maxSeconds={getPomodoroComponent(state.position).seconds}
              color={getPomodoroComponent(state.position).color}
              timeSize="h5"
              circleSize={150}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}