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
