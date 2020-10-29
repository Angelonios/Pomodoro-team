import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright, EmailField, PasswordField, FormLink } from '../molecules';
import { FormButton } from '../atoms';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';

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

  /*
    Zde to bude chtít asi vymyslet lepší řešení, bohužel se mi nic lepšího
    npeodařilo. Open for improvement.
  */
  const [formData, updateFormData] = useState(initialFormData);
  const [emailErrorText, updateEmailErrorText] = useState('');
  const [passwordErrorText, updatePasswordErrorText] = useState('');
  const [rePasswordErrorText, updateRePasswordErrorText] = useState('');

  const history = useHistory();
  const isMounted = useRef(false);
  const routeChange = (route) => {
    let path = route;
    history.push(path);
  };

  useEffect(() => {
    if (isMounted.current) {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]){2,3}$/.test(formData.email)) {
        updateEmailError(false);
        updateEmailErrorText('');
      } else {
        updateEmailError(true);
        updateEmailErrorText('Enter a valid email adress !');
      }
      if (formData.password.length >= 6) {
        updatePasswordError(false);
        updatePasswordErrorText('');
      } else {
        updatePasswordError(true);
        updatePasswordErrorText(
          'The password must be atleast 6 characters long !',
        );
      }
      if (formData.rePassword === formData.password) {
        updateRePasswordError(false);
        updateRePasswordErrorText('');
      } else {
        updateRePasswordError(true);
        updateRePasswordErrorText('The passwords do not match !');
      }
      /*
      console.log(emailError);
      console.log(passwordError);
      console.log(rePasswordError);
      */
    } else {
      isMounted.current = true;
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    if (!(rePasswordError || passwordError || emailError)) {
      return routeChange(route.home());
    } else {
      return routeChange(route.signUp());
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
      <CssBaseline />
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
          <FormLink />
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
