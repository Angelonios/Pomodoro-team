export const CreateTeam = async (
  _,
  { teamName, owner_id },
  { dbConnection },
) => {
  const dbResponse = await dbConnection.query(
    `INSERT INTO teams (name, owner_id)
    VALUES (?, ?);`,
    [teamName, owner_id],
  );
  const dbResponse2 = await dbConnection.query(
    `INSERT INTO in_team (user_id, team_id)
    VALUES (?, ?);`,
    [owner_id, dbResponse.insertId],
  );
  const teamObject = {
    team_id: 3,
    name: teamName,
    owner_id: owner_id,
  };
  return { Team: teamObject };
};
