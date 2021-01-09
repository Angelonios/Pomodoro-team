import React from 'react';
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
} from '@material-ui/core';

export function DayStatisticsDialog({ open, setOpen, day }) {
  console.log(day);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {day?.date.toLocaleString('en-us', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {day?.tasks?.length !== 0
            ? 'Your tasks:'
            : 'There are no tasks logged for this day.'}
        </DialogContentText>
        <List component="nav">
          {day?.tasks?.map((task) => (
            <ListItem
              key={task.task_id}
              button
              //selected={selectedUserId === teamMember.user_id}
              onClick={
                (event) => alert('Click')
                //handleListItemClick(event, teamMember.user_id)
              }
            >
              <ListItemText primary={task.task_description} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
        {/*
        <Button
          onClick={() => handleConfirmWithNewTeamOwner(selectedUserId)}
          color="secondary"
          variant="contained"
          disabled={!selectedUserId}
        >
          Confirm new owner and leave
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
