import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NameField } from 'src/molecules';
import SaveIcon from '@material-ui/icons/Save';
import { gql, useMutation } from '@apollo/client';
import { route } from '../Routes';
import { useAuth } from '../utils/auth';

const NAME_CHANGE = gql`
  mutation NameChange($name: String!, $user_id: Int!) {
    NameChange(name: $name, user_id: $user_id)
  }
`;

export function NameChangeButton({ name, user_id }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [nameErrorText, updateNameErrorText] = useState('');
  const [nameError, updateNameError] = useState(false);
  const { user } = useAuth();
  const history = useHistory();
  const [badName, setBadName] = useState(false);

  const initialFormData = Object.freeze({
    name: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  var name;
  const handleClickOpen = () => {
    updateFormData({
      name: '',
    });
    setOpen(true);
    setBadName(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [nameChange] = useMutation(NAME_CHANGE, {
    onCompleted: ({ NameChangeButton: { name, user_id } }) => {
      setOpen2(true);
    },
    onError: () => {
      setBadName(true);
      setOpen2(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('formData.name:', formData.name);
    if (/\w/.test(formData.name)) {
      name = false;
      updateNameError(false);
      updateNameErrorText('');
    } else {
      name = true;
      updateNameError(true);
      updateNameErrorText('Enter a valid name !');
    }
    if (!name) {
      nameChange({
        variables: { name: formData.name, user_id: user.user_id },
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
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Change name
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Change name?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change your display name {''}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
