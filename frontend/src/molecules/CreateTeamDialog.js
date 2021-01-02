import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function CreateTeamDialog({
  open,
  text,
  path,
  teamName,
  id,
  setOpen,
  setOpen2,
}) {
  const history = useHistory();

  const handleClose = () => {
    if (path === '/') {
      setOpen(false);
      history.push(path);
    } else {
      if (path === '/profile') {
        setOpen(false);
        window.location.reload();
      } else {
        setOpen(false);
        setOpen2(false);
        window.location.reload();
      }
      /*setOpen2(false);*/
      /*history.push({
        pathname: path,
        data: {
          name: teamName,
          id: id,
        },
      }); */
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Info'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text} {''}!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
