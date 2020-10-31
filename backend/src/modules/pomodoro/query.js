// export const AnonymPomodoro = async (_, { link }, { dbConnection }) => {
//
//   const AnonymPomodoro = (
//     await dbConnection.query(`SELECT * FROM anonym_pomodoro WHERE link = ?`, [
//       link,
//     ])
//   )[0];
//
//   if (!AnonymPomodoro) {
//     return null;
//   }
//
//   return AnonymPomodoro;
// };
