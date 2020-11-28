export const updatePomodoro = async (
  _,
  { running, position, communicationId, shareId },
  { dbConnection },
) => {
  await dbConnection.query(
    `INSERT INTO pomodoros
    (
        running, position_in_cycle, communication_id, share_id
    )
    VALUES
        (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    running = ?, position_in_cycle = ?, communication_id = ?, share_id = ?;
`,
    [
      running,
      position,
      communicationId,
      shareId,
      running,
      position,
      communicationId,
      shareId,
    ],
  );
  /*   await dbConnection.query(
    `UPDATE pomodoros SET running = ?, position_in_cycle = ?, WHERE communication_id = ?;`,
    [running, position, communicationId],
  ); */
  return 'ok';
};

export const savePomodoroDuration = async (
  _,
  { userId, finishedAt, duration },
  { dbConnection },
) => {
  await dbConnection.query(
    `INSERT INTO pomodoro_statistics
    (
        user_id, finished_at, duration
    )
    VALUES
        (?, ?, ?);
`,
    [
      userId,
      finishedAt,
      duration,
    ],
  );

  return 'ok';
};
