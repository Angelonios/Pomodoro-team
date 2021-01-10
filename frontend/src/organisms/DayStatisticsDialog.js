import React, { useEffect, useState } from 'react';
import {
  Box,
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

import { useMutation } from '@apollo/client';

import { DELETE_TASK, EDIT_TASK, ADD_TASK } from 'src/utils/serverSyncUtils';

import { TaskConfirmationDialog } from './TaskConfirmationDialog';

export function DayStatisticsDialog({
  open,
  setOpen,
  date,
  pages,
  currentPage,
  refetch,
}) {
  // States
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    confirmationDialogTaskName,
    setConfirmationDialogTaskName,
  ] = useState();
  const [confirmationDialogTaskId, setConfirmationDialogTaskId] = useState();
  const [confirmationDialogType, setConfirmationDialogType] = useState();
  const [textFieldError, setTextFieldError] = useState(null);

  // Mutations
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted() {
      refetch();
    },
  });
  const [editTask] = useMutation(EDIT_TASK, {
    onCompleted() {
      refetch();
    },
  });
  const [addTask] = useMutation(ADD_TASK, {
    onCompleted() {
      refetch();
    },
  });

  // Set filtered day index on change of date, pages or currentPage
  useEffect(() => {
    if (pages[currentPage] && date) {
      let filteredDayIndex = pages[currentPage].findIndex(
        (day) => day.date === date,
      );
      if (filteredDayIndex >= 0) setSelectedDayIndex(filteredDayIndex);
    }
  }, [date, pages, currentPage]);

  // Handle close of DayStatisticsDialog
  const handleClose = () => {
    setOpen(false);
  };

  // Prepare confirmation dialog by type
  const handleDeleteTask = (taskId, taskName) => {
    setConfirmationDialogOpen(true);
    setConfirmationDialogTaskName(taskName);
    setConfirmationDialogTaskId(taskId);
    setConfirmationDialogType('DELETE');
  };

  const handleEditTask = (taskId, taskName) => {
    setConfirmationDialogOpen(true);
    setConfirmationDialogTaskName(taskName);
    setConfirmationDialogTaskId(taskId);
    setConfirmationDialogType('EDIT');
    setTextFieldError(null);
  };
  const handleAddTask = () => {
    setConfirmationDialogOpen(true);
    setConfirmationDialogTaskName('');
    setConfirmationDialogTaskId(null);
    setConfirmationDialogType('ADD');
    setTextFieldError(null);
  };

  if (!pages[currentPage]) return '';

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            container
            alignItems="center"
            justify="space-between"
            spacing={2}
            direction="row"
          >
            <Grid item xs={10}>
              {date?.toLocaleString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </Grid>
            <Grid item xs={2}>
              <Box textAlign="right">
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {pages[currentPage][selectedDayIndex].tasks.length === 0 ? (
            <DialogContentText>
              There are no tasks logged for this day.
            </DialogContentText>
          ) : (
            ''
          )}
          <List component="nav">
            {pages[currentPage][selectedDayIndex].tasks.map((task) => (
              <ListItem key={task.task_id} divider={true}>
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
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() =>
                            handleEditTask(task.task_id, task.task_description)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete task">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() =>
                            handleDeleteTask(
                              task.task_id,
                              task.task_description,
                            )
                          }
                        >
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
            onClick={() => handleAddTask()}
            color="secondary"
            variant="contained"
            fullWidth
            startIcon={<AddIcon />}
          >
            Add another task
          </Button>
        </DialogActions>
      </Dialog>
      <TaskConfirmationDialog
        open={confirmationDialogOpen}
        setOpen={setConfirmationDialogOpen}
        taskName={confirmationDialogTaskName}
        taskId={confirmationDialogTaskId}
        type={confirmationDialogType}
        date={date}
        deleteTask={deleteTask}
        editTask={editTask}
        addTask={addTask}
        textFieldError={textFieldError}
        setTextFieldError={setTextFieldError}
      />
    </>
  );
}
