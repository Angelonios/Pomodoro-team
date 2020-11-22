import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function TeamPageName({ email }) {
  if (window.innerWidth < 740) {
    return (
      <Box
        display="flex"
        style={{
          width: '33%',
          marginBottom: '15px',
          marginLeft: '20px',
        }}
      >
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
  } else {
    return (
      <Box display="flex" style={{ width: '33%', margin: 'auto' }}>
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
}
