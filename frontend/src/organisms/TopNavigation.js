import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core/';

export function TopNavigation() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Team Pomodori
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
