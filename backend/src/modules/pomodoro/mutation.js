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

  const result =  updatePomodoroDuration(
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
async function updatePomodoroDuration (
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
async function insertPomodoroDuration (
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
  )[0];

  return result;
}

export const saveTask = async (
  _,
  { user_id, task_description },
  { dbConnection },
) => {
  const hasPomodoroToday = (await dbConnection.query(
    `SELECT * FROM pomodoro_statistics
     WHERE
      user_id = ? 
      AND finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d');`,
    [user_id],
  ))[0];

  if (!hasPomodoroToday) {
    const newPomodoro = await insertPomodoroDuration(dbConnection, user_id);
    const task_id = await insertTask(
      dbConnection,
      newPomodoro.id,
      task_description,
      );

    return {
      task_id: task_id,
      user_id: user_id,
      pomodoro_statistic_id: hasPomodoroToday.id,
      task_description: task_description,
    };
  }

  const task_id = await insertTask(
    dbConnection,
    hasPomodoroToday.id,
    task_description);

  return {
    task_id: task_id,
    user_id: user_id,
    pomodoro_statistic_id: hasPomodoroToday.id,
    task_description: task_description,
  };
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
    function(err, result,) {
      if (err) throw err;
      return result
    });

  return result.insertId;
}
