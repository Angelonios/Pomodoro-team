import React from 'react';
import { Grid, Typography, Tooltip } from '@material-ui/core';

import { TeamDetailAvatar } from 'src/atoms/';

export function TeamPageName({ email, name, owner }) {
  return (
    <Grid item xs={10} md={4}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TeamDetailAvatar owner={owner} email={email} />
        </Grid>
        <Grid item>
          <Tooltip title={email}>
            <Typography
              component="div"
              style={{
                alignSelf: 'center',
                wordBreak: 'break-word',
                marginLeft: '5px',
              }}
            >
              {name}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}
