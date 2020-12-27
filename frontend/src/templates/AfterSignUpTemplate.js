import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright } from 'src/molecules';
import { FormButton } from 'src/atoms';
import { route } from 'src/Routes';

import { PageTitle } from 'src/utils/userNotification/PageTitle';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function AfterSignUpTemplate() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const email = location.data;
  const handleSubmit = (e) => {
    history.push({
      pathname: route.signIn(),
      data: email,
    });
  };

  return (
    <>
      <PageTitle pageName={'Welcome'} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.paper}>
            Your account has been successfully created. Please continue to
            sign-in.
          </Typography>
          <form className={classes.form} noValidate>
            <FormButton submit={handleSubmit}>continue to sign-in</FormButton>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
