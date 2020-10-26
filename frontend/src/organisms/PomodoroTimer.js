import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Button } from '@material-ui/core';
import { CircularProgressBarWithLabel } from 'src/molecules';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';
export function PomodoroTimer() {
  const pomodoroTimes = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  };
  const [remainingTime, setRemainingTime] = useState(pomodoroTimes.pomodoro);

  useEffect(() => {
    // stop countdown after reaching 0
    if (!remainingTime) return;

    const intervalId = setInterval(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);

    // clear interval on re-render
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  return (
    <>
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
                <CircularProgressBarWithLabel
                  variant={'static'}
                  remainingTime={remainingTime}
                  maxTime={pomodoroTimes.pomodoro}
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
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        alert('clicked');
                      }}
                      startIcon={<PlayArrowTwoToneIcon />}
                    >
                      Start
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled
                      onClick={() => {
                        alert('clicked');
                      }}
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
    </>
  );
}
