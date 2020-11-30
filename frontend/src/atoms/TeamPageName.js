import React from 'react';
import { Grid, Typography, Tooltip } from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function TeamPageName({ email, name }) {
  return (
    <Grid item xs={10} md={4} style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex' }}>
        <Gravatar
          email={email}
          size={45}
          style={{ verticalAlign: 'sub', padding: '5px' }}
        />{' '}
        <Tooltip title={email}>
          <Typography
            component="div"
            style={{ alignSelf: 'center', wordBreak: 'break-word' }}
          >
            {' '}
            {name}
          </Typography>
        </Tooltip>
      </div>
    </Grid>
  );
}
