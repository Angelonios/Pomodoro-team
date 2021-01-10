import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Paper, Avatar, Grid, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright, EmailField, PasswordField, FormLink } from 'src/molecules';
import { FormButton } from 'src/atoms';
import { route } from 'src/Routes';
import { useAuth } from 'src/utils/auth';
import { SIGN_IN } from 'src/utils/serverSyncUtils';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
  error: {
    backgroundColor: '#1b0f0f',
    borderRadius: 50,
    marginTop: 15,
  },
}));

export function SignInForm() {
  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();

  const location = useLocation();
  const email = location.data;
  const initialFormData = Object.freeze({
    email: email,
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [errorText, updateErrorText] = useState('');
  const [error, updateError] = useState(false);
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: ({ SignIn: { user, token } }) => {
      updateErrorText('');
      updateError(false);
      auth.signin({ token, user });
      history.replace('/');
    },
    onError: () => {
      updateErrorText(
        'Meh, we were unable to find you using these credentials.',
      );
      updateError(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn({
      variables: { email: formData.email, password: formData.password },
    });
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  if (error) {
    return (
      <Container component="main" maxWidth="xs">
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Container maxWidth="xs" className={classes.error}>
              <Typography
                component="h5"
                variant="caption"
                color="error"
                display="inline"
              >
                <b>{errorText}</b>
              </Typography>
            </Container>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <EmailField
                  data={email}
                  formData={formData}
                  formErrors={error}
                  handleChange={handleChange}
                />
                <PasswordField
                  id="password"
                  name="password"
                  formData={formData}
                  formErrors={error}
                  handleChange={handleChange}
                >
                  Password
                </PasswordField>
              </Grid>
              <FormButton submit={handleSubmit}>Sign in</FormButton>
              <FormLink link={route.signUp()}>
                Don't have an account? Sign Up
              </FormLink>
            </form>
          </div>
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <EmailField
                  data={email}
                  formData={formData}
                  formErrors={error}
                  handleChange={handleChange}
                />
                <PasswordField
                  id="password"
                  name="password"
                  formData={formData}
                  formErrors={error}
                  handleChange={handleChange}
                >
                  Password
                </PasswordField>
              </Grid>
              <FormButton submit={handleSubmit}>Sign in</FormButton>
              <FormLink link={route.signUp()}>
                Don't have an account? Sign Up
              </FormLink>
            </form>
          </div>
        </Paper>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
