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

import { TaskConfirmationDialog } from './TaskConfirmationDialog';
import { DELETE_TASK, EDIT_TASK } from 'src/utils/serverSyncUtils';
/* const SAVE_TASK = gql`
  mutation SaveTask($user_id: Int!, $task_desc: Int!) {
    saveTask(user_id: $user_id, task_description: String!): String!
  }
`; */

export function DayStatisticsDialog({
  open,
  setOpen,
  date,
  pages,
  currentPage,
  refetch,
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [
    confirmationDialogTaskName,
    setConfirmationDialogTaskName,
  ] = useState();
  const [confirmationDialogTaskId, setConfirmationDialogTaskId] = useState();
  const [confirmationDialogType, setConfirmationDialogType] = useState();

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

  useEffect(() => {
    if (pages[currentPage] && date) {
      let filteredDayIndex = pages[currentPage].findIndex(
        (day) => day.date === date,
      );
      if (filteredDayIndex >= 0) setSelectedDayIndex(filteredDayIndex);
    }
  }, [date, pages, currentPage]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteTask = (taskId, taskName) => {
    setConfirmationDialogOpen(true);
    setConfirmationDialogTaskName(taskName);
    setConfirmationDialogTaskId(taskId);
    setConfirmationDialogType('DELETE');

    //deleteTask({ variables: { task_id: taskId, user_id: auth.user.user_id } });
  };
  const handleEditTask = (taskId, taskName) => {
    setConfirmationDialogOpen(true);
    setConfirmationDialogTaskName(taskName);
    setConfirmationDialogTaskId(taskId);
    setConfirmationDialogType('EDIT');
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
      <TaskConfirmationDialog
        open={confirmationDialogOpen}
        setOpen={setConfirmationDialogOpen}
        taskName={confirmationDialogTaskName}
        taskId={confirmationDialogTaskId}
        type={confirmationDialogType}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </>
  );
}
