import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { route } from '../Routes';

export function CreateTeamDialog({
  open2,
  text,
  path,
  teamName,
  id,
  setOpen,
  setOpen2,
}) {
  const history = useHistory();

  const handleClose = () => {
    history.push({
      pathname: path,
      data: {
        name: teamName,
        id: id,
      },
    });
    setOpen(false);
    setOpen2(false);
  };

  return (
    <Dialog
      open={open2}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'HELLO'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text} {''}!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
