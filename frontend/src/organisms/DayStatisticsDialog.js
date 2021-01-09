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

import AddIcon from '@material-ui/icons/Add';
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
        <Grid container alignItems="center" justify="space-between" spacing={4}>
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
        {day?.tasks?.length === 0 ? (
          <DialogContentText>
            There are no tasks logged for this day.
          </DialogContentText>
        ) : (
          ''
        )}
        <List component="nav">
          {day?.tasks?.map((task) => (
            <ListItem
              key={task.task_id}
              divider={true}
              //button
              //selected={selectedUserId === teamMember.user_id}
              /* onClick={
                (event) => alert('Click')
                //handleListItemClick(event, teamMember.user_id)
              } */
            >
              <Grid container>
                <Grid item>
                  <ListItemText
                    primary={task.task_description}
                    style={{ paddingRight: '100px' }}
                  />
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => alert('New task')}
          color="secondary"
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
        >
          Add another task
        </Button>
      </DialogActions>
    </Dialog>
  );
}
