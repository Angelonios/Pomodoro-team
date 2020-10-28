import React from 'react';
import { Box, Container, Grid, Paper, Button } from '@material-ui/core';
import { CircularPomodoroCountdown } from 'src/molecules';
import { PomodoroTimerButton } from 'src/atoms';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';

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
                <CircularPomodoroCountdown maxTime={1500} />
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
                    <PomodoroTimerButton
                      startIcon={<PlayArrowTwoToneIcon />}
                      text="Begin work"
                      size="large"
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {}}
                      startIcon={<PauseCircleFilledTwoToneIcon />}
                    >
                      Pause
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        alert('clicked');
                      }}
                      startIcon={<FreeBreakfastTwoToneIcon />}
                    >
                      Break
                    </Button>
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
