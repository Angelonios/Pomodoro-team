import React from 'react';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  text: {
    color: 'white',
  },
}));

export function Avatar({ email }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={6} style={{ minHeight: '245px' }}>
      <Paper className={classes.paper} style={{ minHeight: '225px' }}>
        <Gravatar email={email} size={150} default="retro" />
        <Typography variant="h5" className={classes.text}>
          {email}
        </Typography>
      </Paper>
    </Grid>
  );
}
