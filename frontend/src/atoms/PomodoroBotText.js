import React, { useState, useEffect, useMemo } from 'react';
import reactStringReplace from 'react-string-replace';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { getMessage } from 'src/utils/pomodoroBotUtils';
import { usePomodoroState } from 'src/utils/PomodoroContext';
import { useAuth } from 'src/utils/auth';
import { useStatistics } from 'src/utils/UserStatistics';
import { tomato } from 'src/utils/pomodoroBotMapping';

import happyTomato from 'src/assets/tomatoes/happyTomato.svg';
import amazedTomato from 'src/assets/tomatoes/amazedTomato.svg';
import angryTomato from 'src/assets/tomatoes/angryTomato.svg';
import chilledTomato from 'src/assets/tomatoes/chilledTomato.svg';
import sadTomato from 'src/assets/tomatoes/sadTomato.svg';
import veryHappyTomato from 'src/assets/tomatoes/veryHappyTomato.svg';

import { Link } from 'react-router-dom';
import { route } from 'src/Routes';

export function PomodoroBotText() {
  const pomodoroState = usePomodoroState();
  const userState = useAuth();
  const todaysSeconds = useStatistics({ type: 'today' });
  const [message, setMessage] = useState();

  const memoizedPomodoroState = useMemo(
    () => ({
      timerState: pomodoroState.pomodoroTimerState,
      componentType: pomodoroState.type,
    }),
    [pomodoroState.pomodoroTimerState, pomodoroState.type],
  );

  useEffect(() => {
    if (todaysSeconds !== 'loading') {
      setMessage(
        getMessage({
          pomodoroState: memoizedPomodoroState,
          userState,
          todaysSeconds,
        }),
      );
    }
  }, [memoizedPomodoroState, userState, todaysSeconds]);

  const completeMessage = (message) => {
    let replacedText;

    // Match "Registration"
    replacedText = reactStringReplace(
      message,
      '___REGISTRATION___',
      (match, i) => <Link to={route.signUp()}>Registration</Link>,
    );

    // Match "register"
    replacedText = reactStringReplace(
      replacedText,
      '___REGISTER___',
      (match, i) => <Link to={route.signUp()}>register</Link>,
    );
    // Match "Log-in here"
    replacedText = reactStringReplace(
      replacedText,
      '___LOG_IN_HERE___',
      (match, i) => <Link to={route.signIn()}>Log-in here</Link>,
    );

    return replacedText;
  };

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
        width: '0px',
        lineHeight: 0,
        marginTop: '30px',
        display: 'inline-block',
        padding: '0 0 0 0',
      },
      '& a': {
        color: theme.palette.secondary.contrastText,
      },
    },
    avatar: {
      padding: '80px 0 0 0',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '0',
      },
      height: '200px',
    },
    avatarImg: {
      transform: 'scaleX(-1)',
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
              <p className={classes.bubbleText}>
                {completeMessage(message?.text)}
              </p>
            </div>
          </Grid>
          <Grid item id="avatar" className={classes.avatar} xs={5} md={2}>
            <Grid container alignItems="flex-start">
              <img
                className={classes.avatarImg}
                src={
                  message?.avatar === tomato.amazed
                    ? amazedTomato
                    : message?.avatar === tomato.angry
                    ? angryTomato
                    : message?.avatar === tomato.chilled
                    ? chilledTomato
                    : message?.avatar === tomato.happy
                    ? happyTomato
                    : message?.avatar === tomato.sad
                    ? sadTomato
                    : message?.avatar === tomato.veryHappy
                    ? veryHappyTomato
                    : happyTomato
                }
                alt="Tomato"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
