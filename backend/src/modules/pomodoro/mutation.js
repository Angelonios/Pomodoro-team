
export const UpdatePomodoro = async (_, {running, position, communicationId, shareId}, { dbConnection }) => {
  await dbConnection.query(
    `UPDATE anonym_pomodoro SET running = ?, position = ?, WHERE communicationId = ?;`,
    [action, lastUpdated, id]
  );
};
