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

  const cache = useMemo(() => {
    if (timerUpdate.loading || timerUpdate.error) return null;
    if (timerUpdate.data.pomodoro === null) {
      return <PageNotFound />;
    }

    return timerUpdate.data;
  }, [timerUpdate.loading, timerUpdate.error, timerUpdate.data]);

  const [remainingSeconds, setRemainingSeconds] = useReducer(
    pomodoroReducer,
    30,
    //getPomodoroComponent(cache.pomodoro.position).seconds,
  );

  /** loading data from server */
  /*   useEffect(() => {
    let refreshTimeout = setTimeout(() => {
      timerUpdate.refetch();
    }, 5000);

    clearTimeout(refreshTimeout);
  }, [timerUpdate.loading]); */

  /** timer time */
  /*   useEffect(() => {
    if (cache !== null) {
      console.log(cache.pomodoro.position);
      const timerTimeout = setTimeout(() => {
        setRemainingSeconds({
          finalTime:
            ,
        });
      }, 1000);

      return clearTimeout(timerTimeout);
    }
  }); */

  useEffect(() => {
    if (cache !== null) {
      const timer = setTimeout(() => {
        setRemainingSeconds({
          finalTime:
            Date.now() / 1000 +
            (getPomodoroComponent(cache.pomodoro.position).seconds -
              cache.pomodoro.secondsSinceStart),
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

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
                maxSeconds={
                  //getPomodoroComponent(cache.pomodoro.position).seconds
                  111
                }
                color={
                  //getPomodoroComponent(cache.pomodoro.position).color
                  'primary'
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box p={4}>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={8} xs={12}>
              <ShareUrl shareUrl={urlParams.shareId} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
