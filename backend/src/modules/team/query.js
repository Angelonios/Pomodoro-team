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

export const getUsersFromTeam = async (_, { team_id }, { dbConnection }) => {
  const usersFromTeam = await dbConnection.query(
    `SELECT email, users.user_id, pomodoro_id FROM users JOIN in_team ON users.user_id = in_team.user_id WHERE in_team.team_id = ?`,
    [team_id],
  );

  if (!usersFromTeam) {
    return null;
  }

  return usersFromTeam;
};

export const teamMembersPomodoro = async (_, { team_id }, { dbConnection }) => {
  const teamMembersPomodoro = await dbConnection.query(
    `SELECT users.email, users.user_id, pomodoros.share_id, users.display_name FROM in_team
    JOIN users ON in_team.user_id = users.user_id JOIN pomodoros ON users.pomodoro_id = pomodoros.pomodoro_id WHERE in_team.team_id = ?`,
    [team_id],
  );

  if (!teamMembersPomodoro) {
    return null;
  }
  return teamMembersPomodoro;
};

export const gardenSquares = async (_, { team_id }, { dbConnection }) => {
  const gardenSquares = await dbConnection.query(
    `SELECT * FROM garden WHERE team_id = ?`,
    [team_id],
  );

  if (!gardenSquares) {
    return null;
  }
  console.log(gardenSquares);
  return gardenSquares;
};
