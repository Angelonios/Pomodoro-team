import React from 'react';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

export function MyAvatar({ email }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={6} style={{ minHeight: '245px' }}>
      <Paper className={classes.paper} style={{ minHeight: '225px' }}>
        <div style={{ textAlign: '-webkit-center' }}>
          <Avatar className={classes.large} variant="circle">
            <Gravatar email={email} size={150} default="retro" />
          </Avatar>
        </div>
        <Typography variant="h5" className={classes.text}>
          {email}
        </Typography>
      </Paper>
    </Grid>
  );
}
