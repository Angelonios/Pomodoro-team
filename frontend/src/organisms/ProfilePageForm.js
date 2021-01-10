import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { NameChangeForm } from 'src/molecules';
import { BetaModeSwitch } from 'src/atoms';
import { useAuth } from 'src/utils/auth';

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
export function ProfilePageForm() {
  const { user } = useAuth();
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={6} style={{ minHeight: '245px' }}>
      <Paper className={classes.paper} style={{ minHeight: '225px' }}>
        <NameChangeForm name={user.display_name} />
        <BetaModeSwitch />
      </Paper>
    </Grid>
  );
}
