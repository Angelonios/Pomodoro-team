import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useAuth } from 'src/utils/auth';
import { usePomodoroDispatch } from 'src/utils/PomodoroContext';
import { SET_TASK_NAME } from 'src/utils/pomodoroReducer';
import { GET_CURRENT_TASK, SAVE_TASK } from 'src/utils/serverSyncUtils';
import { useMutation, useQuery } from '@apollo/client';

export function TaskForm() {
  const auth = useAuth();
  const dispatch = usePomodoroDispatch();
  const [task, setTask] = useState('');
  const { loading, data } = useQuery(GET_CURRENT_TASK, {
    variables: {
      skip: !auth.user,
      user_id: auth.user?.user_id,
    },
    onCompleted: () => {
      const fetchedTask = data.getCurrentTask
        ? data.getCurrentTask.task_description
        : '';
      setTask(fetchedTask);
      dispatch({ type: SET_TASK_NAME, newName: fetchedTask });
    },
  });

  const [saveTask] = useMutation(SAVE_TASK);

  const handleTaskFormEdit = () => {
    debugger;
    if (task.trim().length === 0) {
      setTask(
        data !== undefined || data.getCurrentTask !== null
          ? ''
          : data.getCurrentTask.task_description,
      );
      return;
    }
    dispatch({ type: SET_TASK_NAME, newName: task });
    saveTask({
      variables: {
        user_id: auth.user.user_id,
        task_description: task,
        date: null,
      },
    });
  };

  return (
    <>
      {auth.user && (
        <form
          onSubmit={(e) => {
            handleTaskFormEdit();
            e.preventDefault();
          }}
        >
          <TextField
            id="task_input"
            label="What are you working on?"
            onChange={(e) => {
              e.preventDefault();
              setTask(e.target.value);
            }}
            value={!loading ? task : 'Loading...'}
            onBlur={() => handleTaskFormEdit()}
            fullWidth
            inputProps={{ style: { fontSize: '2rem', textAlign: 'center' } }}
            InputLabelProps={{ style: { textAlign: 'center' } }}
          />
        </form>
      )}
    </>
  );
}
