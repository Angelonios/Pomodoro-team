import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { CircularPomodoroCountdown } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';
import { usePomodoroState } from 'src/utils/PomodoroContext';

export function PomodoroTimer() {
  const state = usePomodoroState();
  return (
    <>
      <Box p={1}>
        <Grid
          container
          spacing={6}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xl={4} lg={4} xs={12} align="center">
            <CircularPomodoroCountdown
              remainingSeconds={state.remainingSeconds}
              maxSeconds={state.maxSeconds}
              color={state.color}
              timeSize="h2"
              circleSize={300}
              pauseControls={state.pauseControls}
              performAction={state.performAction}
            />
          </Grid>
          <Grid item xl={4} lg={4} xs={12}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <PomodoroTimerButton />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
