import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper, Grid } from '@material-ui/core';
import { NameField, NameChangeButton } from 'src/molecules';
import { useAuth } from '../utils/auth';

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
  const { user } = useAuth();
  const classes = useStyles();
  console.log('user.display_name:', user.display_name);

  return (
    <Container component="main">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h2" align="center" className={classes.text}>
              <NameField name={user.display_name} />

              <NameChangeButton user_id={user.user_id} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
