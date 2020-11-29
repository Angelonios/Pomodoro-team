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

export const savePomodoroDuration = async (
  _,
  { user_id, finished_at, duration },
  { dbConnection },
) => {
  const date = (new Date(parseInt(finished_at)));
  await dbConnection.query(
    `INSERT INTO pomodoro_statistics
    (
        user_id, finished_at, duration
    )
    VALUES
        (?, ?, ?);
`,
    [
      user_id,
      date,
      duration,
    ],
  );

  return 'ok';
};

