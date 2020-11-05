import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { useParams } from 'react-router';
import { Container, Paper, Box, Grid } from '@material-ui/core';
import { POMODORO_QUERY } from '../utils/serverSync';
import { useQuery } from '@apollo/client';
import { getPomodoroComponent } from '../utils/pomodoroCycle';
import { pomodoroReducer } from '../utils/pomodoroReducer';
import { CircularPomodoroCountdown, ShareUrl } from '../molecules';
import { PageNotFound } from './PageNotFound';


export function SharePage() {
  const urlParams = useParams('shareId');
  let shareId = urlParams.shareId;
  //todo get url

  const timerUpdate = useQuery(POMODORO_QUERY, { variables: { shareId } });
  debugger;
  const [remainingSeconds, setRemainingSeconds] = useReducer(
    pomodoroReducer,
    getPomodoroComponent(0).seconds,
  );

  /** loading data from server */
  let refreshTimeout = setTimeout(() => {
    timerUpdate.refetch();
  }, 5000);
      timerUpdate.refetch();
    }, 5000);

    clearTimeout(refreshTimeout);
  }, [timerUpdate.loading]);

  /** timer time */
  useEffect(() => {
    if (timerUpdate !== null) {
      const timerTimeout = setTimeout(() => {
        setRemainingSeconds({
          finalTime:
            getPomodoroComponent(timerUpdate.data.pomodoro.position).seconds -
            timerUpdate.data.pomodoro.secondsSinceStart,
        });
      }, 1000);

      return clearTimeout(timerTimeout);
    }
  }, [timerUpdate.loading]);

  return (
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
                remainingSeconds={remainingSeconds}
                maxSeconds={getPomodoroComponent(0).seconds}
                color={getPomodoroComponent(0).color}
              />
            </Grid>
          </Grid>
        </Box>
        <Box p={4}>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={8} xs={12}>
              <ShareUrl shareUrl={shareId} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
