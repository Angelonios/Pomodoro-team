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
import { Copyright, TeamNameField, CreateTeamDialog } from 'src/molecules';
import { useAuth } from 'src/utils/auth';
import { FormButton } from '../atoms';

//TODO: CREATE_TEAM
const CREATE_TEAM = gql`
  mutation CreateTeam($teamName: String!, $owner_id: Int!) {
    CreateTeam(teamName: $teamName, owner_id: $owner_id) {
      name
      team_id
      owner_id
    }
  }
`;

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

export function CreateTeamForm({ teamNameError, setTeamNameError }) {
  const { user } = useAuth();

  const classes = useStyles();

  const initialFormData = Object.freeze({
    teamName: '',
  });

  const [open, setOpen] = useState(false);
  const [formData, updateFormData] = useState(initialFormData);
  const [teamNameErrorText, setTeamNameErrorText] = useState('');
  var teamName;

  const [createTeam] = useMutation(CREATE_TEAM, {
    onCompleted: ({ CreateTeam: { teamName, owner_id } }) => {},
    onError: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.teamName === '') {
      teamName = false;
      setTeamNameError(true);
      setTeamNameErrorText('Please enter a name for your new team.');
    } else {
      teamName = true;
      setTeamNameError(false);
      setTeamNameErrorText('');
    }
    if (teamName) {
      setOpen(true);
      createTeam({
        variables: { teamName: formData.teamName, owner_id: user.user_id },
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
          <CreateTeamDialog open={open} />
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
