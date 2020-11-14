export const userTeams = async (_, { user_id }, { dbConnection }) => {
  if(email === undefined || email === null){
    return null;
  }

  const userTeams = getUserTeams(user_id, dbConnection);

  if (!userTeams) {
    return null;
  }

  return userTeams;
}

async function getUserTeams({ user_id, dbConnection }) {
  const result = (
    //TODO: make join
    await dbConnection.query(
      `SELECT * FROM teams WHERE team_id = (
        SELECT team_id FROM in_team WHERE user_id = (
          SELECT user_id FROM users WHERE email = ?
        )
      );`, [user_id])
  );

  return result;
}

export const usersInTeam = async (_, {team_id}, {dbConnection}) => {
  if(team_id === undefined || team_id === null){
    return null;
  }
}

