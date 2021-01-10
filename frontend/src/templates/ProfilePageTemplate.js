import React from 'react';
import { Typography, Container, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MyAvatar } from 'src/molecules';
import { TopNavigation, ProfilePageForm } from 'src/organisms';
import { PageTitle } from 'src/utils/userNotification/PageTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function ProfilePageTemplate({ email }) {
  const classes = useStyles();

  return (
    <>
      <PageTitle pageName="Profile" />
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
          <MyAvatar email={email} />
          <ProfilePageForm />
        </Grid>
      </Container>
    </>
  );
}
