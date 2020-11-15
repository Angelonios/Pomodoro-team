export const user = async (_, { user_id }, { dbConnection }) => {
  const user = (
    await dbConnection.query(`SELECT * FROM users WHERE user_id = ?`, [user_id])
  )[0];
  if (!user) {
    return null;
  }
  return user;
};

export const users = async (_, __, { dbConnection }) => {
  const users = await dbConnection.query('SELECT * FROM users');
  return users;
};

export const userPomodoroIds = async (_, { user_id }, { dbConnection }) => {
  const userPomodoroIds = (
    await dbConnection.query(
      `SELECT communication_id,share_id FROM users JOIN pomodoros ON users.pomodoro_id=pomodoros.pomodoro_id WHERE user_id = ?`,
      [user_id],
    )
  )[0];
  if (!userPomodoroIds) {
    return null;
  }
  return userPomodoroIds;
};
