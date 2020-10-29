import React from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { CircularPomodoroCountdown } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';

export function PomodoroTimer() {
  return (
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
  );
}
