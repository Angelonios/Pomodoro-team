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
    <Container component="main">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h2" align="center" className={classes.text}>
              <b>Profile</b>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Gravatar email={email} size={150} default="retro" />
            <Typography variant="h5" className={classes.text}>
              {email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
