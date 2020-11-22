import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function NavBarName({ email }) {
  return (
    <Box style={{ margin: 'auto' }}>
      Logged in as:{' '}
      <Gravatar email={email} size={20} style={{ verticalAlign: 'sub' }} />{' '}
      {email}
    </Box>
  );
}
