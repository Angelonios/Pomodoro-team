import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useAuth } from 'src/utils/auth';
import { usePomodoroDispatch, usePomodoroState } from 'src/utils/PomodoroContext';
import { SET_TASK_NAME } from 'src/utils/pomodoroReducer';
import { SAVE_TASK, timerStates } from 'src/utils/serverSync';
import { addTask, GetCurrentTask } from 'src/utils/TaskHelper';
import { useMutation } from '@apollo/client';


export function TaskForm() {
  const auth = useAuth();
  const pomodoro = usePomodoroState();
  const dispatch = usePomodoroDispatch();
  const [task, setTask] = useState(GetCurrentTask());
  const [saveTask] = useMutation(SAVE_TASK);


  useEffect(() => {

    const pomodoroIsRunning = pomodoro.pomodoroTimerState === timerStates.running;
    const taskNotEmpty = task.trim().length !== 0;
    const newTaskAlreadySet = pomodoro.taskName === task;

    if (taskNotEmpty
      && !pomodoroIsRunning
      && !newTaskAlreadySet
    ) dispatch({ type: SET_TASK_NAME, newName: task });

    if (taskNotEmpty && pomodoroIsRunning) addTask(task, auth, saveTask);

  }, [task, pomodoro.pomodoroTimerState]);

  return <>
    {auth.user && <TextField
      id="task_input"
      label="Task"
      onChange={(e) => {
        e.preventDefault();
        setTask(e.target.value);
      }}
      defaultValue={GetCurrentTask()}
    />}
  </>;

}
