import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Tooltip, Avatar } from '@material-ui/core';
import Gravatar from 'react-gravatar';

const useStyles = makeStyles((theme) => ({
  medium: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export function TeamPageName({ email, name }) {
  const classes = useStyles();
  return (
    <Grid item xs={10} md={4} style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-flex' }}>
        <Avatar className={classes.medium}>
          <Gravatar
            email={email}
            size={70}
            style={{ verticalAlign: 'sub', padding: '5px' }}
          />
        </Avatar>{' '}
        <Tooltip title={email}>
          <Typography
            component="div"
            style={{
              alignSelf: 'center',
              wordBreak: 'break-word',
              marginLeft: '5px',
            }}
          >
            {' '}
            {name}
          </Typography>
        </Tooltip>
      </div>
    </Grid>
  );
}
