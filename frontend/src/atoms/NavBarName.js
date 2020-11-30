import React from 'react';
import { Box, Tooltip, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function NavBarName({ email, name }) {
  return (
    <Box style={{ margin: 'auto' }}>
      Logged in as:{' '}
      <Gravatar email={email} size={20} style={{ verticalAlign: 'sub' }} />{' '}
      <Tooltip title={email}>
        <b>{name}</b>
      </Tooltip>
    </Box>
  );
}
