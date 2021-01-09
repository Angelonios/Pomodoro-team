export const updatePomodoro = async (
  _,
  { state, position, communicationId, shareId },
  { dbConnection },
) => {
  let secondsSinceStartAtPause = null;
  const storedPomodoro = await getPomodoro({ shareId, dbConnection });
  if (storedPomodoro !== undefined) {
    switch (state) {
      case 'IDLE':
        secondsSinceStartAtPause = null;
        break;
      case 'PAUSED':
        if (storedPomodoro.state === 'RUNNING') {
          const currentTime = await getDbTime(dbConnection);
          const calculatedSecondsSinceStartAtPause =
            currentTime['CURRENT_TIMESTAMP()'] / 1000 -
            storedPomodoro.last_updated / 1000;
          const storedSecondsSinceStartAtPause =
            storedPomodoro.seconds_since_start_at_pause;
          secondsSinceStartAtPause =
            calculatedSecondsSinceStartAtPause + storedSecondsSinceStartAtPause;
          break;
        }
        secondsSinceStartAtPause =
          storedPomodoro.seconds_since_start_at_pause === null
            ? 0
            : storedPomodoro.seconds_since_start_at_pause;
        break;
      case 'RUNNING':
        secondsSinceStartAtPause = storedPomodoro.seconds_since_start_at_pause;
        break;
      default:
        secondsSinceStartAtPause = storedPomodoro.seconds_since_start_at_pause;
    }
  }

  await dbConnection.query(
    `INSERT INTO pomodoros
    (
        state, position_in_cycle, communication_id, share_id, seconds_since_start_at_pause
    )
    VALUES
        (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    state = ?, position_in_cycle = ?, communication_id = ?, share_id = ?, seconds_since_start_at_pause = ?;
`,
    [
      state,
      position,
      communicationId,
      shareId,
      secondsSinceStartAtPause,
      state,
      position,
      communicationId,
      shareId,
      secondsSinceStartAtPause,
    ],
  );
  return 'Pomodoro updated successfully!';
};


async function getPomodoro({ shareId, dbConnection }) {
  const result = await dbConnection.query(
    `SELECT * FROM pomodoros WHERE share_id = ?`,
    [shareId],
  );
  return result[0];
}

async function getDbTime(dbConnection) {
  const result = await dbConnection.query(`SELECT CURRENT_TIMESTAMP()`, []);
  return result[0];
}

/**
 * This function saves users work duration, after finishing a pomodoro.
 * In one day, the user can finish multiple pomodoros, but the duration of each
 * pomodoro is summed in one row in the table pomodoro_statistics.
 * @param _
 * @param user_id - user identification in database
 * @param duration - the duration from users client
 * @param dbConnection - database connection object
 * @returns {Promise<string>}
 */
export const savePomodoroDuration = async (
  _,
  { user_id, duration },
  { dbConnection },
) => {
  const hasPomodoroToday = (await dbConnection.query(
    `SELECT * FROM pomodoro_statistics
     WHERE
      user_id = ? 
      AND finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d');`,
    [user_id],
  ))[0];

  const result = updatePomodoroDuration(
    dbConnection,
    user_id,
    duration,
    hasPomodoroToday.duration,
    hasPomodoroToday.finished_at);

  return (result)
    ? 'ok'
    : 'error';
};

/**
 * Updates work duration after finishing another pomodoro
 * by a given user in the same day.
 * @param dbConnection - database connection object
 * @param user_id - user identification in database
 * @param duration - the duration from users client
 * @param currentDuration - the duration currently available in database
 * @param finished_at - the particular date in which pomodoro was finished
 * @returns {Promise<*>}
 */
async function updatePomodoroDuration(
  dbConnection,
  user_id,
  duration,
  currentDuration,
  finished_at,
) {
  const newDuration = duration + currentDuration;

  const result = await dbConnection.query(
    `UPDATE pomodoro_statistics
     SET
      duration= ? 
     WHERE 
      user_id = ?
      AND finished_at = ?`,
    [newDuration, user_id, finished_at],
  )[0];

  return result;
}

/**
 * Inserts work duration of first finished pomodoro
 * from a given user in one day.
 * @param dbConnection - database connection object
 * @param user_id - user identification in database
 * @param duration - the duration from users client
 * @returns {Promise<*>}
 */
async function insertPomodoroDuration(
  dbConnection,
  user_id,
) {
  const date = new Date();
  const INITIAL_DURATION = 0;

  const result = await dbConnection.query(
    `INSERT INTO pomodoro_statistics (user_id, finished_at, duration)
     VALUES 
      (?, ?, ?);`,
    [user_id, date, INITIAL_DURATION],
  );

  return result.insertId;
}

export const saveTask = async (
  _,
  { user_id, task_description },
  { dbConnection },
) => {
  const hasPomodoroToday = await getTodaysPomodoro(dbConnection, user_id);

  if (hasPomodoroToday.length > 0) {
    return await addTask(dbConnection, user_id, task_description, hasPomodoroToday[0].id);
  }

  return await createPomodoroAndAddTask(dbConnection, user_id, task_description);
};

async function getTodaysPomodoro(
  dbConnection,
  user_id,
) {
  const result = await dbConnection.query(
    `SELECT * FROM pomodoro_statistics
     WHERE
      user_id = ? 
      AND finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d');`,
    [user_id],
  );

  return result;
}

async function createPomodoroAndAddTask(
  dbConnection,
  user_id,
  task_description,
) {
  const newPomodoroId = await insertPomodoroDuration(dbConnection, user_id);

  return await insertTask(
    dbConnection,
    newPomodoroId,
    task_description,
  );
}

const addTask = async (dbConnection, user_id, newTask, pomodoroStatisticId) => {
  const tasksToday = await getTodaysTasks(dbConnection, user_id);

  if(tasksToday.length === 0){
    return await insertTask(dbConnection, pomodoroStatisticId, newTask);
  }

  const numberOfSimilarTasks = tasksToday
    .map(savedTask => areTasksSimilar(savedTask.task_description, newTask))
    .filter(Boolean).length;

  if (numberOfSimilarTasks === 0) {
    return await insertTask(dbConnection, pomodoroStatisticId, newTask);
  }
  return 'duplicate task';
};

async function insertTask(
  dbConnection,
  pomodoro_statistic_id,
  task_description,
) {
  const result = await dbConnection.query(
    `INSERT INTO tasks (pomodoro_statistic_id, task_description)
     VALUES 
     (?, ?);`,
    [pomodoro_statistic_id,
      task_description],
  );

  return (result)
    ? 'Ok'
    : 'Error';
}

async function getTodaysTasks(
  dbConnection,
  user_id,
) {
  return await dbConnection.query(
    `SELECT 
      tasks.task_id AS task_id, 
      tasks.pomodoro_statistic_id AS pomodoro_statistic_id, 
      tasks.task_description AS task_description, 
      pomodoro_statistics.user_id AS user_id
     FROM pomodoro_statistics
     JOIN tasks ON pomodoro_statistics.id = tasks.pomodoro_statistic_id
     WHERE pomodoro_statistics.finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d')
     AND pomodoro_statistics.user_id = ?`,
    [user_id]);
}


/**
 * This function compares two tasks and determines if they are similar.
 * First in compares word count. If the word count doesn't match between two
 * tasks, then tasks are not same.
 * Otherwise when the word count between both tasks matches the function then
 * compares edit distances between each words in both tasks and counts the
 * number of similar words. If the edit distance between two words is 1 or 0,
 * then the words are considered similar.
 * If the number of similar words is same as the word count in both tasks then
 * these tasks are similar. Otherwise they are not similar.
 * @param task1
 * @param task2
 */
const areTasksSimilar = (task1, task2) => {
  const wordsInTask1 = task1.split(' ');
  const wordsInTask2 = task2.split(' ');

  const wordCountTask1 = wordsInTask1.length;
  const wordCountTask2 = wordsInTask2.length;

  if (wordCountTask1 !== wordCountTask2) return false;

  const similarWords = wordsInTask1.map((word1, index) => {
    const word2 = wordsInTask2[index];
    const editDistance = getDistanceBetweenStrings(word1, word2);
    return !(editDistance > 1);
  }).filter(Boolean).length;

  if (similarWords === wordCountTask1) {
    return true;
  }

  return false;
};

/**
 * This function calculates Levenshtein distance metric between two strings.
 * The distance measures number of edits (deletion, insertion and replacement)
 * needed to make in order to get same strings.
 * @param string1
 * @param string2
 * @returns {number|*}
 */
const getDistanceBetweenStrings = (string1, string2) => {
  if (!string1 || string1.length === 0) {
    return string2.length;
  }
  if (!string2 || string2.length === 0) {
    return string1.length;
  }
  let [head1, ...tail1] = string1;
  let [head2, ...tail2] = string2;
  if (head1 === head2) {
    return getDistanceBetweenStrings(tail1, tail2);
  }
  const l1 = getDistanceBetweenStrings(string1, tail2);
  const l2 = getDistanceBetweenStrings(tail1, string2);
  const l3 = getDistanceBetweenStrings(tail1, tail2);
  return 1 + Math.min(l1, l2, l3);
};

export const deleteTask = async (
  _,
  { user_id, task_id },
  { dbConnection },
) => {
  if (user_id === null || task_id === null) {
    return 'wrong parameters';
  }

  const taskExists = await existingTaskFromUser(dbConnection, user_id, task_id);

  if (taskExists.length !== 0) {
    dbConnection.query(
      `DELETE 
       FROM tasks 
       WHERE task_id = ?`,
      [taskExists[0].task_id],
    );
    return 'task deleted';
  }

  return 'task does not exist';
};

export const editTask = async (
  _,
  { user_id, task_id, task_description },
  { dbConnection },
) => {
  if (user_id === null || task_id === null) {
    return 'wrong parameters';
  }

  const taskExists = await existingTaskFromUser(dbConnection, user_id, task_id);

  if (taskExists.length !== 0) {
    dbConnection.query(
      `UPDATE tasks 
       SET task_description=? 
       WHERE task_id = ?`,
      [task_description, taskExists[0].task_id]
    );
    return 'task updated'
  }

  return 'task does not exists'
};

async function existingTaskFromUser(
  dbConnection,
  user_id,
  task_id){
  const result = await dbConnection.query(
    `SELECT 
      tasks.task_id AS task_id, 
      pomodoro_statistics.user_id AS user_id
     FROM pomodoro_statistics
     JOIN tasks ON pomodoro_statistics.id = tasks.pomodoro_statistic_id
     WHERE user_id = ?
     AND task_id = ?`,
    [user_id, task_id],
  );

  return result;
}
