import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { useParams } from 'react-router';
import { Container, Paper, Box, Grid } from '@material-ui/core';
import { POMODORO_QUERY } from '../utils/serverSync';
import { useQuery } from '@apollo/client';
import { getPomodoroComponent } from '../utils/pomodoroCycle';
import { pomodoroReducer } from '../utils/pomodoroReducer';
import { CircularPomodoroCountdown, ShareUrl } from '../molecules';

export function SharePage() {
  const urlParams = useParams('shareId');
  let shareId = urlParams.shareId;

  const timerUpdate = useQuery(POMODORO_QUERY, {
    variables: { shareId },
    pollInterval: 5000,
    onComplete: () => {
      setSecondsSinceStart(timerUpdate.data.pomodoro.secondsSinceStart);
      setPosition(timerUpdate.data.pomodoro.position);
    },
  });

  const [finalTime, setFinalTime] = useState();
  const [running, setRunning] = useState(true);
  const [position, setPosition] = useState(0);
  const [secondsSinceStart, setSecondsSinceStart] = useState(0);

  const cache = useMemo(() => {
    if (timerUpdate.loading || timerUpdate.error)
      return {
        pomodoro: { position: position, secondsSinceStart: secondsSinceStart },
      };
    if (timerUpdate.data.pomodoro === null) {
      return (window.location.href = '/*');
    }

    return timerUpdate.data;
  }, [
    timerUpdate.loading,
    timerUpdate.error,
    timerUpdate.data,
    position,
    secondsSinceStart,
  ]);

  const [remainingSeconds, setRemainingSeconds] = useReducer(
    pomodoroReducer,
    getPomodoroComponent(position).seconds,
  );

  /** loading data from server ---*/
  /*  useEffect(() => {
    if (timerUpdate.loading) return;
    const refreshTimeout = setTimeout(() => {
      console.log('refetch');
      timerUpdate.refetch();
    }, 5000);
    clearTimeout(refreshTimeout);
  }, [timerUpdate.loading]); */

  //useffect version o refetch
  /* useEffect(() => {
    if (timerUpdate.loading) {
      return;
    }

    const timeoutId = setTimeout(() => {
      timerUpdate.refetch();
    }, 10000);

    setSecondsSinceStart(timerUpdate.data.pomodoro.secondsSinceStart);
    setPosition(timerUpdate.data.pomodoro.position);

    return () => {
      // this code will be called when component unmounts:
      clearTimeout(timeoutId);
    };
  }, [timerUpdate.loading, timerUpdate]); */

  useEffect(() => {
    if (cache.pomodoro.secondsSinceStart === 0) {
      setRunning(false);
    } else setRunning(true);

    setFinalTime(
      parseInt(
        Date.now() / 1000 +
          (getPomodoroComponent(cache.pomodoro.position).seconds -
            cache.pomodoro.secondsSinceStart),
      ),
    );
  }, [cache]);

  useEffect(() => {
    if (running) {
      const timer = setTimeout(() => {
        setRemainingSeconds({
          finalTime: finalTime,
        });
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setRemainingSeconds({
        finalTime: finalTime,
      });
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
                  getPomodoroComponent(cache.pomodoro.position).seconds
                }
                color={getPomodoroComponent(cache.pomodoro.position).color}
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
  );
}
