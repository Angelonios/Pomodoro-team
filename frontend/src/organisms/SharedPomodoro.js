import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { TableCell } from '@material-ui/core';
import { getPomodoroComponent } from 'src/utils/pomodoroCycle';
import {
  pomodoroReducer,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';
import { CircularPomodoroCountdown } from 'src/molecules';
import { POMODORO_QUERY } from 'src/utils/serverSync';

export function SharedPomodoro({ shareId }) {
  const serverPomodoro = useQuery(POMODORO_QUERY, {
    variables: { shareId },
    pollInterval: 5000,
  });

  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    position: 0,
    running: false,
    finalTime: 0,
    isOffline: false,
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
    <>
      <TableCell align="center">
        {state.isOffline
          ? 'Offline'
          : state.running
          ? getPomodoroComponent(state.position).label
          : 'Idle'}
      </TableCell>
      <TableCell align="center">
        <CircularPomodoroCountdown
          remainingSeconds={state.remainingSeconds}
          maxSeconds={getPomodoroComponent(state.position).seconds}
          color={getPomodoroComponent(state.position).color}
          timeSize="h5"
          circleSize={150}
        />
      </TableCell>
    </>
    /* <Container>
      <Box>
        <Grid container spacing={10} alignItems="center">
          <Grid item>
            {state.isOffline
              ? 'Offline'
              : state.running
              ? getPomodoroComponent(state.position).label
              : 'Idle'}
          </Grid>
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
    </Container> */
  );
}
