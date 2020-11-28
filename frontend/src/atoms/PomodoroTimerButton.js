import React from 'react';

import {
  usePomodoroDispatch,
  usePomodoroState,
} from 'src/utils/PomodoroContext';

import { Button } from '@material-ui/core';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import FlagIcon from '@material-ui/icons/Flag';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';
import { useAuth } from '../utils/auth';
import { gql, useMutation } from '@apollo/client';

const SAVE_POMODORO_STATISTICS = gql`
  mutation savePomodoroDuration($user_id: Int!, $finished_at: String!, $duration: Int!) {
    savePomodoroDuration(user_id: $user_id, finished_at: $finished_at, duration: $duration )
  }
`;

export function PomodoroTimerButton({ text, size }) {
  const dispatch = usePomodoroDispatch();
  const state = usePomodoroState();
  const auth = useAuth();
  const [savePomodoroDuration] = useMutation(SAVE_POMODORO_STATISTICS);

  const getStartIcon = () => {
    if (state.pomodoroRunning) {
      return <FlagIcon />;
    } else {
      switch (state.type) {
        case 1:
          return <PlayArrowTwoToneIcon />;
        case 2:
          return <FreeBreakfastTwoToneIcon />;
        case 3:
          return <FreeBreakfastTwoToneIcon />;
        default:
          return <PlayArrowTwoToneIcon />;
      }
    }
  };

  const pomodoroStatistic = (e) => {
    let statisticsData = {};
    if(e.target.textContent === 'Finish' && state.label === 'Work' && auth.user){
      // statisticsData = {
      //   user_id: auth.user.user_id,
      //   finished_at: Date.now().toString(),
      //   duration: calcRemainingTime()
      // }
      // debugger;

      savePomodoroDuration({
        variables: {
          user_id: auth.user.user_id,
          finished_at: Date.now().toString(),
          duration: calcRemainingTime(),
        },
      });

    }
  };

  function calcRemainingTime(){
    const remainingSeconds = state.remainingSeconds;
    const POMODORO_DURATION = 1500;
    const DURATION_LIMIT = -900;
    const MAX_DURATION = 2400;
    if(remainingSeconds <= DURATION_LIMIT){
      return MAX_DURATION;
    }
    return POMODORO_DURATION - remainingSeconds;
  }

  let buttonText = '';
  state.pomodoroRunning
    ? (buttonText = 'Finish')
    : (buttonText = state.buttonText);

  return (
    <Button
      startIcon={getStartIcon()}
      variant="contained"
      color={state.color}
      size={size}
      onClick={(e) => {
        pomodoroStatistic(e);
        dispatch();
        }
      }
    >
      {buttonText}
    </Button>
  );
}
