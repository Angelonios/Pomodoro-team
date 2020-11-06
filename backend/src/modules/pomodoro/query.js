export const pomodoro = async (_, { shareId }, { dbConnection }) => {
  const pomodoro = getPomodoro(shareId);

  if (!pomodoro) {
    console.log('null');
    return null;
  }

  const currentTime = getDbTime();

  let secondsSinceStart = 0;
  let positionInCycle = pomodoro.position_in_cycle;

  if (pomodoro.running === 0) {
    secondsSinceStart = 0;
  } else {
    secondsSinceStart =
      currentTime['CURRENT_TIMESTAMP()'] / 1000 - pomodoro.last_updated / 1000;
  }

  const HOUR = 3600;

  //If timer is idle for more than 10 hours, then restart it
  if (
    currentTime['CURRENT_TIMESTAMP()'] / 1000 - pomodoro.last_updated / 1000 >
    HOUR * 10
  ) {
    return { position: 0, secondsSinceStart: 0 };
  } else {
    return { position: positionInCycle, secondsSinceStart: secondsSinceStart };
  }
};

async function getPomodoro(shareId) {
  const result = await dbConnection.query(`SELECT * FROM pomodoros WHERE share_id = ?`, [
    shareId
  ]);
  return result[0];
}

async function getDbTime(){
  const result = await dbConnection.query(`SELECT CURRENT_TIMESTAMP()`, []);
  return result[0];
}
