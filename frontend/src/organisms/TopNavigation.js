import React from 'react';

import { useHistory } from 'react-router-dom';
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import { route } from 'src/Routes';
import { NavLink, NavBarName } from 'src/atoms';
import { useAuth } from 'src/utils/auth';
import { MenuUser } from 'src/organisms';

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
            <Grid container style={{ maxWidth: 'max-content' }}>
              <Grid item>
                <Typography variant="h6" className={classes.title}>
                  <NavLink
                    to={route.home()}
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Team Pomodori
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} style={{ textAlign: 'end' }}>
                <NavBarName email={user.email} name={user.display_name} />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'end' }}>
                <MenuUser user_id={user.user_id} logOut={logOut} />
              </Grid>
            </Grid>
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
            <Typography align="right">
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
