import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  CircularProgress,
  Button,
} from '@material-ui/core';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';
export function PomodoroTimer() {
  return (
    <>
      <Container component="main" maxWidth="xl">
        <Paper elevation={3}>
          <Box m={4}>
            <Grid
              container
              spacing={10}
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={3}>
                <CircularProgress variant={'static'} value={75} size={300} />
                {
                  //TODO: Label
                }
              </Grid>
              <Grid item>
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
