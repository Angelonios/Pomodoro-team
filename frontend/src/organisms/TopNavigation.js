import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core/';
import { route } from 'src/Routes';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'src/atoms';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function TopNavigation() {
  const classes = useStyles();
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
