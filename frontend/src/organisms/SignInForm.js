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
import { useHistory, useLocation } from 'react-router-dom';
import { route } from 'src/Routes';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';

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

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      user {
        user_id
        email
      }
      token
    }
  }
`;

export function SignInForm({ props }) {
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
      //console.log('good SignIn');
      updateErrorText('');
      updateError(false);
      auth.signin({ token, user });
      history.replace('/');
    },
    onError: () => {
      //console.log('bad SignIn');
      updateErrorText(
        'Meh, we were unable to find you using these credentials.',
      );
      updateError(true);
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
              data={email}
              formData={formData}
              formErrors={error}
              helperText={errorText}
              handleChange={handleChange}
            />
            <PasswordField
              id="password"
              name="password"
              formData={formData}
              formErrors={error}
              helperText={errorText}
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
