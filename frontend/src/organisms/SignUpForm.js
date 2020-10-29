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
  const initialFormErrors = Object.freeze({
    emailError: false,
    passwordError: false,
    rePasswordError: false,
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [formErrors, updateFormErrors] = useState(initialFormErrors);
  var errors = Object({
    email: '',
    password: '',
    rePassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formData.email)) {
      updateFormErrors({
        ...formErrors,
        emailError: false,
      });
      errors.email = '';
    } else {
      updateFormErrors({
        ...formErrors,
        emailError: true,
      });
      errors.email = 'Enter a valid email!';
    }
    if (formData.password.length >= 6) {
      updateFormErrors({
        ...formErrors,
        passwordError: false,
      });
      errors.password = '';
    } else {
      updateFormErrors({
        ...formErrors,
        passwordError: true,
      });
      errors.password = 'Password must be atleast 6 characters long!';
    }
    if (formData.password === formData.rePassword) {
      updateFormErrors({
        ...formErrors,
        rePasswordError: false,
      });
      errors.rePassword = '';
    } else {
      updateFormErrors({
        ...formErrors,
        rePasswordError: true,
      });
      errors.rePassword = 'Passwords do not match!';
    }
    console.log(formData);
    console.log(formErrors);
    console.log(errors);
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
              formErrors={formErrors.emailError}
              helperText={errors.email}
            />
            <PasswordField
              handleChange={handleChange}
              formErrors={formErrors.passwordError}
              helperText={errors.password}
              id="password"
              name="password"
            >
              Password
            </PasswordField>
            <PasswordField
              handleChange={handleChange}
              formErrors={formErrors.rePasswordError}
              helperText={errors.rePassword}
              id="re-password"
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
