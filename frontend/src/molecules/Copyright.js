import React from 'react';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'src/atoms';
import { route } from 'src/Routes';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <NavLink
        to={route.home()}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        {' '}
        Team Pomodori{' '}
      </NavLink>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
