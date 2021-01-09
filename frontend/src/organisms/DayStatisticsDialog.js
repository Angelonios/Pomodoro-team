import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export function DayStatisticsDialog({ open, setOpen, day }) {
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
        <Grid container alignItems="center" spacing={4}>
          <Grid item>
            {day?.date.toLocaleString('en-us', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </Grid>
          <Grid item>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
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
              //button
              //selected={selectedUserId === teamMember.user_id}
              /* onClick={
                (event) => alert('Click')
                //handleListItemClick(event, teamMember.user_id)
              } */
            >
              <ListItemText primary={task.task_description} />
              <ListItemSecondaryAction>
                <Tooltip title="Edit task">
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete task">
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => alert('New task')}
          color="secondary"
          variant="contained"
        >
          Add another task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
