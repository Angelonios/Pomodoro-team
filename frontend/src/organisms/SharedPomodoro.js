import React, { useEffect, useReducer } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
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
      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
        {state.isOffline
          ? 'Offline'
          : state.running
          ? getPomodoroComponent(state.position).label
          : 'Idle'}
      </Grid>
      <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
        <CircularPomodoroCountdown
          remainingSeconds={state.remainingSeconds}
          maxSeconds={getPomodoroComponent(state.position).seconds}
          color={getPomodoroComponent(state.position).color}
          timeSize="h5"
          circleSize={150}
        />
      </Grid>
    </>
  );

  /*
  return (
    <>
      <Box align="center" style={{ width: '33%', margin: 'auto' }}>
        {state.isOffline
          ? 'Offline'
          : state.running
          ? getPomodoroComponent(state.position).label
          : 'Idle'}
      </Box>
      <Box align="center" style={{ width: '33%', margin: 'auto' }}>
        <CircularPomodoroCountdown
          remainingSeconds={state.remainingSeconds}
          maxSeconds={getPomodoroComponent(state.position).seconds}
          color={getPomodoroComponent(state.position).color}
          timeSize="h5"
          circleSize={150}
        />
      </Box>
    </>
 <Container>
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
    </Container> 
  );*/
}
