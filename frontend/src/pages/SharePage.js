import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container, Paper, Box, Grid } from '@material-ui/core';
import {
  getPomodoroComponent,
  getTimerStateFriendlyName,
} from 'src/utils/pomodoroCycle';
import {
  pomodoroReducer,
  GET_REMAINING_SECONDS,
  SET_POMODORO_STATE,
} from 'src/utils/pomodoroReducer';
import { CircularPomodoroCountdown, ShareUrl } from 'src/molecules';
import { POMODORO_QUERY, timerStates } from 'src/utils/serverSync';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

export function SharePage() {
  const urlParams = useParams('shareId');
  const shareId = urlParams.shareId;

  const serverPomodoro = useQuery(POMODORO_QUERY, {
    variables: { shareId },
    pollInterval: 5000,
  });

  const [state, dispatch] = useReducer(pomodoroReducer, {
    remainingSeconds: 1500,
    secondsSinceStart: 0,
    finalTime: 0,
    position: 0,
    timerState: timerStates.idle,
  });

  const history = useHistory();
  useEffect(() => {
    if (!serverPomodoro.error && !serverPomodoro.loading) {
      if (serverPomodoro.data.pomodoro === null) {
        history.push({
          pathname: '/error404',
        });
      } else {
        dispatch({
          type: SET_POMODORO_STATE,
          newState: serverPomodoro.data.pomodoro,
        });
      }
    }
  }, [serverPomodoro, history]);

  ////////////////////////////////////////////////////////////////
  // If timer === running, refresh remaining seconds every second
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (state.timerState !== timerStates.running) return;
    const timer = setTimeout(() => {
      dispatch({ type: GET_REMAINING_SECONDS });
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <PageTitle
        pageName={getTimerStateFriendlyName({
          timerState: state.timerState,
          position: state.position,
        })}
      />
      <Container component="main">
        <Paper elevation={3}>
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
                  timeSize="h2"
                  circleSize={300}
                />
              </Grid>
            </Grid>
          </Box>
          <Box p={4}>
            <Grid container alignItems="center" justify="center">
              <Grid item lg={8} xs={12}>
                <ShareUrl shareUrl={window.location.href} />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
