import React from 'react';
import Gravatar from 'react-gravatar';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Paper, Grid } from '@material-ui/core';
import { NameField, NameChangeForm } from 'src/molecules';
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

  return (
    <Grid item xs={12} sm={12} md={6} style={{ minHeight: '245px' }}>
      <Paper className={classes.paper} style={{ minHeight: '225px' }}>
        <NameChangeForm name={user.display_name} />
      </Paper>
    </Grid>
  );
}
