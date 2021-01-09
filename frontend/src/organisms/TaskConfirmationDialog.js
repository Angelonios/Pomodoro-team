import React, { useState } from 'react';
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
  TextField,
} from '@material-ui/core';

import { useAuth } from '../utils/auth';

export function TaskConfirmationDialog({
  open,
  setOpen,
  taskName,
  taskId,
  type,
  deleteTask,
  editTask,
}) {
  const auth = useAuth();
  const [textFieldValue, setTextFieldValue] = useState(taskName);

  const handleConfirm = () => {
    setOpen(false);
    switch (type) {
      case 'DELETE':
        deleteTask({
          variables: { task_id: taskId, user_id: auth.user.user_id },
        });
        break;
      case 'EDIT':
        editTask({
          variables: {
            task_id: taskId,
            user_id: auth.user.user_id,
            task_description: textFieldValue,
          },
        });
        break;

      default:
        break;
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        {type === 'DELETE'
          ? 'Are you sure?'
          : type === 'EDIT'
          ? 'Edit task'
          : 'Add new task'}
      </DialogTitle>
      <DialogContent>
        {type === 'DELETE' ? (
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete {taskName}?
          </DialogContentText>
        ) : (
          ''
        )}
        {type !== 'DELETE' ? (
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            fullWidth
            defaultValue={taskName}
            onChange={(e) => {
              e.preventDefault();
              setTextFieldValue(e.target.value);
            }}
          />
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          {type === 'DELETE'
            ? 'Yes, delete!'
            : type === 'EDIT'
            ? 'Save changes'
            : 'Save new task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
