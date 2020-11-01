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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    SignUp(email: $email, password: $password) {
      user_id
      email
    }
  }
`;

export function SignUpForm({
  emailError,
  updateEmailError,
  passwordError,
  updatePasswordError,
  rePasswordError,
  updateRePasswordError,
}) {
  /*
  const {
    emailError,
    updateEmailError,
    passwordError,
    updatePasswordError,
    rePasswordError,
    updateRePasswordError,
  } = props;

  props.emailError
*/

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
  var password;
  var email;
  var rePassword;

  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: () => {
      console.log('good SignUp');
      routeChange(route.signIn());
    },
    onError: () => {
      console.log('bad SignUp');
      routeChange(route.signUp());
    },
  });

  const history = useHistory();
  //const isMounted = useRef(false);
  const routeChange = (route) => {
    let path = route;
    history.push(path);
  };
  /*
  useEffect(() => {
    if (isMounted.current) {
      console.log(emailError);
      console.log(passwordError);
      console.log(rePasswordError);
    } else {
      isMounted.current = true;
    }
  }, [formData]);*/

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.([A-Za-z]){2,3}$/.test(formData.email)) {
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
      console.log(formData);
      signUp({
        variables: { email: formData.email, password: formData.password },
      });
      return; //routeChange(route.signIn());
    } else {
      return; //routeChange(route.signUp());
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
          <FormLink link={route.signIn()}>
            Already have an account? Sign in
          </FormLink>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
