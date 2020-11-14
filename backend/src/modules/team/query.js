export const userTeams = async (_, { user_id }, { dbConnection }) => {
  //const userTeams = getUserTeams(user_id, dbConnection);
  const userTeams = await dbConnection.query(
    `SELECT teams.team_id, name from teams JOIN in_team ON in_team.team_id = teams.team_id WHERE user_id= ?;`,
    [user_id],
  );
  if (!userTeams) {
    return null;
  }

  return userTeams;
};

/*async function getUserTeams({ user_id, dbConnection }) {
  const result =
    //TODO: make join
    await dbConnection.query(
      `SELECT teams.team_id, name from teams JOIN in_team WHERE user_id= ?;`,
      [user_id],
    );

  return result;
}*/

/*
export const usersInTeam = async (_, { team_id }, { dbConnection }) => {
  if (team_id === undefined || team_id === null) {
    return null;
  }
};
*/

export const team = async (_, { team_id }, { dbConnection }) => {
  const team = (
    await dbConnection.query(`SELECT * FROM teams WHERE team_id = ?`, [team_id])
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
