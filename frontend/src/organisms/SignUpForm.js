import React from 'react';
import { useState } from 'react';
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

export function SignUpForm() {
  const classes = useStyles();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
    rePassword: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [emailError, updateEmailError] = useState(false);
  const [emailErrorText, updateEmailErrorText] = useState('');
  const [passwordError, updatePasswordError] = useState(false);
  const [passwordErrorText, updatePasswordErrorText] = useState('');
  const [rePasswordError, updateRePasswordError] = useState(false);
  const [rePasswordErrorText, updateRePasswordErrorText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
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

    console.log(formData);
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
