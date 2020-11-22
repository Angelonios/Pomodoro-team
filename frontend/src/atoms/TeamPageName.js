import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function TeamPageName({ email }) {
  return (
    <Grid item xs={12} md={4} style={{ textAlign: 'center' }}>
      <Gravatar
        email={email}
        size={45}
        style={{ verticalAlign: 'sub', padding: '5px' }}
      />{' '}
      <Typography component="div" style={{ alignSelf: 'center' }}>
        {' '}
        {email}
      </Typography>
    </Grid>
  );
}
