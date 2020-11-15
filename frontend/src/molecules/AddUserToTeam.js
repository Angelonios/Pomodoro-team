import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Copyright, EmailField, PasswordField, FormLink } from 'src/molecules';
import DialogTitle from '@material-ui/core/DialogTitle';

const ADD_USER = gql`
  mutation AddUserToTeam($team_id: Int!, $email: String!) {
    AddUserToTeam(team_id: $team_id, email: $email) {
      team_id
      email
    }
  }
`;

export function AddUserToTeam({ team_id }) {
  const [open, setOpen] = React.useState(false);
  const [emailErrorText, updateEmailErrorText] = useState('');
  const [emailError, updateEmailError] = useState(false);
  const initialFormData = Object.freeze({
    email: '',
  });
  const [formData, updateFormData] = useState(initialFormData);
  var email;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [addUserToTeam] = useMutation(ADD_USER, {
    onCompleted: ({ AddUserToTeam: { team_id, email } }) => {},
    onError: () => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... submit to API or something
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
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Subscribe to PewDiePie</DialogContentText>
          <EmailField
            formData={formData}
            handleChange={handleChange}
            formErrors={emailError}
            helperText={emailErrorText}
            data={''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
