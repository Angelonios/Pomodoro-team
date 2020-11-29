import React from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { CircularPomodoroCountdown, ShareUrl } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';
import { usePomodoroState } from 'src/utils/PomodoroContext';

export function PomodoroTimer() {
  const state = usePomodoroState();
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
                spacing={2}
              >
                <Grid item>
                  <PomodoroTimerButton />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box p={8}>
          <Grid container alignItems="center" justify="center">
            <Grid item lg={8} xs={12}>
              <ShareUrl shareUrl={state.shareUrl} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
