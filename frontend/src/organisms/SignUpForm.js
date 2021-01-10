import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Avatar, Grid, Box, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright, EmailField, PasswordField, FormLink } from 'src/molecules';
import { FormButton } from 'src/atoms';
import { route } from 'src/Routes';

import { usePomodoroState } from 'src/utils/PomodoroContext';
import { SIGN_UP } from 'src/utils/serverSyncUtils';

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
}));

export function SignUpForm({
  emailError,
  updateEmailError,
  passwordError,
  updatePasswordError,
  rePasswordError,
  updateRePasswordError,
}) {

  const classes = useStyles();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
    rePassword: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [emailErrorText, updateEmailErrorText] = useState('');
  const [passwordErrorText, updatePasswordErrorText] = useState('');
  const [rePasswordErrorText, updateRePasswordErrorText] = useState('');
  var password;
  var email;
  var rePassword;
  const history = useHistory();
  const pomodoroState = usePomodoroState();
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: ({ SignUp: { user, token } }) => {
      //auth.signin({ token, user });
      history.push({
        pathname: route.afterSignUp(),
        data: formData.email,
      });
    },
    onError: () => {
      updateEmailError(true);
      updateEmailErrorText('This email adress already exists !');
      //routeChange(route.signUp());
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,4}$/.test(formData.email)
    ) {
      email = false;
      updateEmailError(false);
      updateEmailErrorText('');
    } else {
      email = true;
      updateEmailError(true);
      updateEmailErrorText('Enter a valid email adress !');
    }
    if (formData.password.length >= 6) {
      password = false;
      updatePasswordError(false);
      updatePasswordErrorText('');
    } else {
      password = true;
      updatePasswordError(true);
      updatePasswordErrorText(
        'The password must be atleast 6 characters long !',
      );
    }
    if (formData.rePassword === formData.password) {
      rePassword = false;
      updateRePasswordError(false);
      updateRePasswordErrorText('');
    } else {
      rePassword = true;
      updateRePasswordError(true);
      updateRePasswordErrorText('The passwords do not match !');
    }
    if (!(email || password || rePassword)) {
      signUp({
        variables: {
          email: formData.email,
          password: formData.password,
          communicationId: pomodoroState.communicationId,
        },
      });
    }
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <EmailField
                formData={formData}
                handleChange={handleChange}
                formErrors={emailError}
                helperText={emailErrorText}
              />
              <PasswordField
                handleChange={handleChange}
                formErrors={passwordError}
                helperText={passwordErrorText}
                id="password"
                name="password"
              >
                Password
              </PasswordField>
              <PasswordField
                handleChange={handleChange}
                formErrors={rePasswordError}
                helperText={rePasswordErrorText}
                id="rePassword"
                name="rePassword"
              >
                Re-enter password
              </PasswordField>
            </Grid>
            <FormButton submit={handleSubmit}>Create your account</FormButton>
            <FormLink link={route.signIn()}>
              Already have an account? Sign in
            </FormLink>
          </form>
        </div>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
