import React from 'react';

import {
  Button,
  ButtonGroup,
  Popper,
  Grow,
  Paper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import FlagIcon from '@material-ui/icons/Flag';
import FreeBreakfastTwoToneIcon from '@material-ui/icons/FreeBreakfastTwoTone';

import {
  usePomodoroDispatch,
  usePomodoroState,
} from 'src/utils/PomodoroContext';


import { timerStates } from 'src/utils/serverSync';
import { Button } from '@material-ui/core';
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
    if (
      state.pomodoroTimerState === timerStates.running ||
      state.pomodoroTimerState === timerStates.paused
    ) {
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


  const dropDownOptions = state.actions.secondary;

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
  state.pomodoroTimerState === timerStates.running ||
  state.pomodoroTimerState === timerStates.paused
    ? (buttonText = 'Finish')
    : (buttonText = state.buttonText);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    state.performAction({ type: 'secondary', index: index });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        color={state.color}
        ref={anchorRef}
        size={size}
        aria-label="split button"
      >
        <Button
          startIcon={getStartIcon()}
          onClick={() => state.performAction({ type: 'primary' })}
        >
          {buttonText}
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {dropDownOptions.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
