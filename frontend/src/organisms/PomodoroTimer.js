import React from 'react';
import { Box, Container, Grid, Paper, Button } from '@material-ui/core';
import { CircularPomodoroCountdown } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';

import { PomodoroProvider } from 'src/utils/PomodoroContext';

export function PomodoroTimer() {
  return (
    <PomodoroProvider>
      <Container component="main">
        <Paper elevation={3}>
          <Box m={4}>
            <Grid
              container
              spacing={10}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xl={4} lg={4} xs={12} align="center">
                <CircularPomodoroCountdown />
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
        </Paper>
      </Container>
    </PomodoroProvider>
  );
}
