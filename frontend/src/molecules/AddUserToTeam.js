import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { EmailField } from 'src/molecules';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CreateTeamDialog } from 'src/molecules';

const ADD_USER = gql`
  mutation AddUserToTeam($team_id: Int!, $email: String!) {
    AddUserToTeam(team_id: $team_id, email: $email)
  }
`;

export function AddUserToTeam({ team_id, team_name }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [emailErrorText, updateEmailErrorText] = useState('');
  const [emailError, updateEmailError] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const initialFormData = Object.freeze({
    email: '',
  });
  const [formData, updateFormData] = useState(initialFormData);
  var email;
  const handleClickOpen = () => {
    updateFormData({
      email: '',
    });
    setOpen(true);
    setBadEmail(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addUserToTeam] = useMutation(ADD_USER, {
    onCompleted: ({ AddUserToTeam: { team_id, email } }) => {
      setOpen2(true);
    },
    onError: () => {
      setBadEmail(true);
      setOpen2(true);
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
    if (!email) {
      addUserToTeam({
        variables: { team_id: team_id, email: formData.email },
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
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add team member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{team_name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new team member </DialogContentText>
          <EmailField
            formData={formData}
            handleChange={handleChange}
            formErrors={emailError}
            helperText={emailErrorText}
            data={''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <CreateTeamDialog
        open={open2}
        setOpen={setOpen}
        setOpen2={setOpen2}
        text={
          badEmail
            ? 'Unable to find user ' + formData.email
            : 'User ' +
              formData.email +
              ' has been addded to group ' +
              team_name
        }
        path={'/teamdetail'}
        teamName={team_name}
        id={team_id}
      />
    </div>
  );
}
