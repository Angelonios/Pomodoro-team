import React from 'react';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper, Grid } from '@material-ui/core';
import { NameField } from 'src/molecules';

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

export function ProfilePageForm({ email }) {
  const classes = useStyles();
  return (
    <Container component="main">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h2" align="center" className={classes.text}>
              <NameField />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
