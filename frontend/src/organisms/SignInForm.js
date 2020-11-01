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
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { gql, useMutation } from '@apollo/client';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      user_id
      email
    }
  }
`;

export function SignInForm() {
  const classes = useStyles();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: () => {
      console.log('good SignIn');
      console.log('SignedIn user: ' + formData.email);
      //routeChange(route.signIn());
    },
    onError: () => {
      console.log('bad SignIn');
      //routeChange(route.signUp());
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    signIn({
      variables: { email: formData.email, password: formData.password },
    });
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <EmailField
              formData={formData}
              formErrors={false}
              helperText={''}
              handleChange={handleChange}
            />
            <PasswordField
              id="password"
              name="password"
              formData={formData}
              formErrors={false}
              helperText={''}
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
