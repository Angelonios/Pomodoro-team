import React from 'react';

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';
import { route } from 'src/Routes';
import { makeStyles } from '@material-ui/core/styles';

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
            Team Pomodori
          </Typography>
          <Typography>
            Hello! Sign-in or{' '}
            <a href={route.signUp()} style={{ textDecoration: 'none' }}>
              <b style={{ color: 'white' }}>create account</b>
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
