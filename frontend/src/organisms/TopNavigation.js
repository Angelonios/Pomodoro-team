import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { route } from 'src/Routes';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'src/atoms';
import { useAuth } from 'src/utils/auth';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function TopNavigation({ currentUser }) {
  const { user, signout } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const logOut = () => {
    signout();
    history.push(route.home());
    window.location.reload();
  };
  if (user != null) {
    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <NavLink
                to={route.home()}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Team Pomodori
              </NavLink>
            </Typography>
            <Typography>
              <b>Hello {user.email}!</b>{' '}
            </Typography>{' '}
            <Typography> </Typography>
            <Button
              className={classes.menuButton}
              type="submit"
              variant="outlined"
              size="small"
              onClick={logOut}
            >
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <NavLink
                to={route.home()}
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Team Pomodori
              </NavLink>
            </Typography>
            <Typography>
              Hello!{' '}
              <NavLink to={route.signIn()} style={{ textDecoration: 'none' }}>
                <b style={{ color: 'white' }}>Sign-in</b>
              </NavLink>{' '}
              or{' '}
              <NavLink to={route.signUp()} style={{ textDecoration: 'none' }}>
                <b style={{ color: 'white' }}>create account</b>
              </NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
