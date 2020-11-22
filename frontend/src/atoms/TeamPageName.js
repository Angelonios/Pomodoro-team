import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function TeamPageName({ email }) {
  return (
    <Box style={{ margin: 'auto' }} display="flex">
      <Gravatar
        email={email}
        size={45}
        style={{ verticalAlign: 'sub', padding: '5px' }}
      />{' '}
      <Typography component="div" style={{ margin: 'auto 0' }}>
        {' '}
        {email}
      </Typography>
    </Box>
  );
}
