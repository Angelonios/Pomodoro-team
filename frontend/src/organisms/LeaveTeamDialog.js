import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from '@material-ui/core';
import Gravatar from 'react-gravatar';

export function LeaveTeamDialog({
  handleCancel,
  handleConfirm,
  handleConfirmWithNewTeamOwner,
  open,
  owner,
  teamMembers,
  user,
}) {
  const [selectedUserId, setSelectedUserId] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedUserId(index);
  };

  if (owner && teamMembers.length > 1)
    return (
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Leave Team?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are the owner of this team, please select a new owner.
          </DialogContentText>

          <List component="nav">
            {teamMembers.map((teamMember) =>
              teamMember.user_id !== user.user_id ? (
                <Tooltip
                  title={teamMember.email}
                  placement="left"
                  key={teamMember.user_id}
                >
                  <ListItem
                    key={teamMember.user_id}
                    button
                    selected={selectedUserId === teamMember.user_id}
                    onClick={(event) =>
                      handleListItemClick(event, teamMember.user_id)
                    }
                  >
                    <ListItemIcon>
                      <Gravatar
                        email={teamMember.email}
                        size={60}
                        style={{ padding: '10px' }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={teamMember.display_name} />
                  </ListItem>
                </Tooltip>
              ) : (
                ''
              ),
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmWithNewTeamOwner(selectedUserId)}
            color="secondary"
            variant="contained"
            disabled={!selectedUserId}
          >
            Confirm new owner and leave
          </Button>
        </DialogActions>
      </Dialog>
    );

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Leave Team?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to leave the group?
          {teamMembers.length === 1
            ? ' You are the only member of this team. The team will no longer have any members.'
            : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary" variant="contained">
          Yes, leave
        </Button>
      </DialogActions>
    </Dialog>
  );
}
