import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { gql, useMutation } from '@apollo/client';
import { route } from '../Routes';
import { useAuth } from '../utils/auth';

const LEAVE_TEAM = gql`
  mutation LeaveTeam($team_id: Int!, $user_id: Int!) {
    LeaveTeam(team_id: $team_id, user_id: $user_id)
  }
`;

export function LeaveTeamButton({ team_id }) {
  const { user } = useAuth();
  const history = useHistory();
  const [leaveTeam] = useMutation(LEAVE_TEAM, {
    onCompleted: () => history.push(route.home()),
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
        user_id: user.user_id,
      },
    });
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Leave Team
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Leave Team?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to leave group {''}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleYes} color="secondary" variant="contained">
            Yes, leave
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
