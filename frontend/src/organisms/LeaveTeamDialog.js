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
  open,
  owner,
  teamMembers,
  user,
}) {
  const [selectedIndex, setSelectedIndex] = useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  if (owner)
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
            You are owner of this team, please select a new owner.
          </DialogContentText>

          <List component="nav">
            {teamMembers.map((teamMember) =>
              teamMember.user_id !== user.user_id ? (
                <Tooltip title={teamMember.email} placement="left">
                  <ListItem
                    key={teamMember.user_id}
                    button
                    selected={selectedIndex === teamMember.user_id}
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
            onClick={handleConfirm}
            color="secondary"
            variant="contained"
            disabled={!selectedIndex}
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
