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
 * Saves users work duration, after finishing a pomodoro.
 * In one day, the user can finish multiple pomodoro, but in the database there
 * is only one record for each day.
 * If user finishes his first pomodoro in the day, a new record is created and
 * the work duration is saved.
 * Every other finished pomodoro in that day, by that user, updates the existing
 * record.
 * Only value of column duration is updated. The updated value is the
 * sum of duration from database and new duration, which comes from user's
 * client.
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
  const result = upsertPomodoroDuration(dbConnection, user_id, duration);

  return (result)
    ? 'ok'
    : 'error';
};

/**
 * This method handles upsert logic for savePomodoroDuration method. It checks
 * whether a record of pomodoro duration exist for given user in particular day.
 * If this record exists, it will be updated. If not it will be inserted.
 * @param dbConnection - database connection object
 * @param user_id - user identification in database
 * @param duration - the duration from users client
 * @returns {Promise<Promise<*>|Promise<*>>}
 */
async function upsertPomodoroDuration (
  dbConnection,
  user_id,
  duration,
) {
  const hasPomodoroToday = (await dbConnection.query(
    `SELECT * FROM pomodoro_statistics
     WHERE
      user_id = ? 
      AND finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d');`,
    [user_id],
  ))[0];

  return (hasPomodoroToday)
    ? updatePomodoroDuration(
        dbConnection,
        user_id,
        duration,
        hasPomodoroToday.duration,
        hasPomodoroToday.finished_at)
    : insertPomodoroDuration(
        dbConnection,
        user_id,
        duration);
}

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
  duration,
) {
  const date = new Date();

  const result = await dbConnection.query(
    `INSERT INTO pomodoro_statistics (user_id, finished_at, duration)
     VALUES 
      (?, ?, ?);`,
    [user_id, date, duration],
  )[0];

  return result;
}
