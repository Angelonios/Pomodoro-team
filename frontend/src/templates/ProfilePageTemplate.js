import React from 'react';
import { Typography, Container, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from 'src/molecules';
import { TopNavigation, ProfilePageForm } from 'src/organisms';

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

export function ProfilePageTemplate({ email }) {
  const classes = useStyles();

  return (
    <>
      <TopNavigation />
      <Container component="main">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h2" align="center" className={classes.text}>
                <b>Profile</b>
              </Typography>
            </Paper>
          </Grid>
          <Avatar email={email} />
          <ProfilePageForm />
        </Grid>
      </Container>
    </>
  );
}
