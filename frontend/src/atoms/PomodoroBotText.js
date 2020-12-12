import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getMessage } from 'src/utils/pomodoroBotUtils';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { useAuth } from 'src/utils/auth';
import { useStatistics } from 'src/utils/UserStatistics';

import happyTomato from 'src/assets/tomatoes/happyTomato.svg';

export function PomodoroBotText() {
  const pomodoroState = usePomodoroState();
  const userState = useAuth();
  const todaysSeconds = useStatistics({ type: 'today' });
  const [message, setMessage] = useState('Text');

  const memoizedPomodoroState = useMemo(
    () => ({
      timerState: pomodoroState.pomodoroTimerState,
      componentType: pomodoroState.type,
    }),
    [pomodoroState.pomodoroTimerState, pomodoroState.type],
  );

  useEffect(() => {
    setMessage(
      getMessage({
        pomodoroState: memoizedPomodoroState,
        userState,
        todaysSeconds,
      }),
    );
    console.log(memoizedPomodoroState);
    console.log(userState);
    console.log(todaysSeconds);
  }, [memoizedPomodoroState, userState, todaysSeconds]);

  const useStyles = makeStyles((theme) => ({
    bubble: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      fontSize: '1.1em',
      fontWeight: 500,
      lineHeight: 1.75,
      padding: '15px 25px',
      marginBottom: '45px',
      cursor: 'default',
      borderRadius: '10px',
      borderBottomRightRadius: '25px',
      borderRight: '5px solid black',
      '&::after': {
        content: '""',
        marginTop: '-30px',
        paddingTop: '0px',
        position: 'relative',
        bottom: '-45px',

        borderWidth: '30px 30px 0 0',
        [theme.breakpoints.down('sm')]: {
          left: '50px',
        },
        borderStyle: 'solid',
        borderColor: theme.palette.secondary.main + ' transparent',
        display: 'block',
        width: 0,
      },
    },
    bubbleText: {
      padding: '0 0 0 0',
      margin: '0 0 10px 0',
      '&::before': {
        content: '"“"',
        fontFamily: 'Georgia',
        fontSize: '60px',
        lineHeight: 0,
        marginTop: '30px',
        display: 'inline-block',
        display: '-webkit-inline-box',
      },
    },
    avatar: {
      padding: '80px 0 0 0',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '0',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={10}>
        <Grid
          container
          id="botContainer"
          className={classes.botContainer}
          justify="flex-end"
          direction="row-reverse"
        >
          <Grid item xs={12} md={10}>
            <div id="bubble" className={classes.bubble}>
              <p className={classes.bubbleText}>{message}</p>
            </div>
          </Grid>
          <Grid item id="avatar" className={classes.avatar} xs={5} md={2}>
            <img src={happyTomato} alt="Tomato" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
