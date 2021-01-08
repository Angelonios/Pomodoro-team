import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useAuth } from 'src/utils/auth';
import { usePomodoroDispatch, usePomodoroState } from 'src/utils/PomodoroContext';
import { SET_TASK_NAME } from 'src/utils/pomodoroReducer';
import { SAVE_TASK } from 'src/utils/serverSync';
import { GetCurrentTask } from 'src/utils/TaskHelper';
import { useMutation } from '@apollo/client';


export function TaskForm() {
  const auth = useAuth();
  const dispatch = usePomodoroDispatch();
  const [task, setTask] = useState(GetCurrentTask());
  const [saveTask] = useMutation(SAVE_TASK);

  const handleTaskFormEdit = () => {
    dispatch({ type: SET_TASK_NAME, newName: task });
    saveTask({
      variables: {
        user_id: auth.user.user_id,
        task_description: task,
      },
    })
  }

  return <>
    {auth.user && <TextField
      id="task_input"
      label="Task"
      onChange={(e) => {
        e.preventDefault();
        setTask(e.target.value);
      }}
      defaultValue={GetCurrentTask()}
      onBlur={() => handleTaskFormEdit()}
    />}
  </>;

}
