import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

import { useAuth } from 'src/utils/auth';
import { FormatDate } from 'src/utils/DateHelper';

export function TaskConfirmationDialog({
  open,
  setOpen,
  taskName,
  taskId,
  type,
  deleteTask,
  editTask,
  addTask,
  date,
  textFieldError,
  setTextFieldError,
}) {
  const auth = useAuth();

  const [textFieldValue, setTextFieldValue] = useState(taskName || '');

  // Handle confirm by type of the dialog
  const handleConfirm = () => {
    switch (type) {
      case 'DELETE':
        deleteTask({
          variables: { task_id: taskId, user_id: auth.user.user_id },
        });
        setOpen(false);
        break;
      case 'EDIT':
        if (textFieldValue.trim() !== '') {
          editTask({
            variables: {
              task_id: taskId,
              user_id: auth.user.user_id,
              task_description: textFieldValue,
            },
          });
          setOpen(false);
        } else setTextFieldError('Task name cannot be empty!');
        break;
      case 'ADD':
        if (textFieldValue.trim() !== '') {
          addTask({
            variables: {
              user_id: auth.user.user_id,
              task_description: textFieldValue,
              date: FormatDate(date),
            },
          });
          setOpen(false);
        } else setTextFieldError('Task name cannot be empty!');
        break;

      default:
        break;
    }
  };

  // Handle confirmation dialog close.
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
          : `Add new task on ${date?.toLocaleString('en-us', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          `}
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
            error={textFieldError}
            helperText={textFieldError}
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
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
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
