import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Tooltip, Typography } from '@material-ui/core';
import Gravatar from 'react-gravatar';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export function NavBarName({ email, name }) {
  const classes = useStyles();
  return (
    <Box style={{ margin: 'auto' }}>
      Logged in as:{' '}
      <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
        <Avatar className={classes.small}>
          <Gravatar
            email={email}
            size={20}
            style={{ verticalAlign: 'sub', border: '1px solid' }}
          />
        </Avatar>
      </div>{' '}
      <Tooltip title={email}>
        <b>{name}</b>
      </Tooltip>
    </Box>
  );
}
