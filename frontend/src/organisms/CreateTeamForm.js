import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Copyright, TeamNameField } from 'src/molecules';
import { FormButton } from 'src/atoms';
import { route } from 'src/Routes';

//TODO: Change to CREATE_TEAM
const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    SignUp(email: $email, password: $password) {
      user {
        user_id
        email
      }
      token
    }
  }
`;

export function CreateTeamForm({teamNameError, setTeamNameError}) {

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

  const classes = useStyles();

  const initialFormData = Object.freeze({
    teamName: ''
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [teamNameErrorText, setTeamNameErrorText] = useState('');
  var teamName;
  const history = useHistory();

  //TODO: Change to CREATE_TEAM
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: ({ SignUp: { user, token } }) => {
      history.push({
        pathname: route.afterSignUp(),
        data: formData.email,
      });
    },
    onError: () => {

    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
    if (formData.email === null) {
      teamName = false;
      setTeamNameError(false);
      setTeamNameErrorText('');
    } else {
      teamName = true;
      setTeamNameError(true);
      setTeamNameErrorText('Please enter a name for your new team.');
    }
    if (!teamName) {
      //TODO: Change to CREATE_TEAM
      signUp({
        variables: { email: formData.email, password: formData.password },
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
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Team
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <TeamNameField
              formData={formData}
              handleChange={handleChange}
              formErrors={teamNameError}
              helperText={teamNameErrorText}
            />
          </Grid>
          <FormButton submit={handleSubmit}>Create team</FormButton>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
