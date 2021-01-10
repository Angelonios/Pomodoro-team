import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { LEAVE_TEAM } from 'src/utils/serverSyncUtils';

export function KickButton({ user_id, team_id, owner_id }) {
  const { user } = useAuth();
  const [leaveTeam] = useMutation(LEAVE_TEAM, {
    onCompleted: () => {
      window.location.reload(false);
    },
  });
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleYes = () => {
    leaveTeam({
      variables: {
        team_id: team_id,
        user_id: user_id,
      },
    });
  };

  if (user_id === owner_id) {
    return '';
  } else if (user.user_id === owner_id) {
    return (
      <div>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Kick from Team
        </Button>
        <Dialog
          open={open}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Kick from team?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to kick this member from group {''}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleYes} color="secondary" variant="contained">
              Yes, Finish him!!!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return '';
  }
}
