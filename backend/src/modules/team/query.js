export const team = async (_, { team_id }, { dbConnection }) => {
  const team = (
    await dbConnection.query(`SELECT * FROM team WHERE team_id = ?`, [team_id])
  )[0];
  if (!team) {
    return null;
  }
  return team;
};

export const teams = async (_, __, { dbConnection }) => {
  const teams = await dbConnection.query('SELECT * FROM teams');
  return teams;
};
