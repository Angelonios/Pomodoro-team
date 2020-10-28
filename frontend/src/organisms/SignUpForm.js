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
            <EmailField formData={formData} updateFormData={updateFormData} />
            <PasswordField
              formData={formData}
              updateFormData={updateFormData}
              id="password"
              name="password"
            >
              Password
            </PasswordField>
            <PasswordField
              formData={formData}
              updateFormData={updateFormData}
              id="re-password"
              name="rePassword"
            >
              Re-enter password
            </PasswordField>
          </Grid>
          <FormButton formData={formData}>Create your account</FormButton>
          <FormLink />
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
