import { user, userPomodoroIds } from '../user/query';

export const pomodoro = async (_, { shareId }, { dbConnection }) => {
  if (shareId !== '' && shareId !== undefined) {
    const pomodoro = await getPomodoro({ shareId, dbConnection });
    if (pomodoro !== undefined) {
      const currentTime = await getDbTime(dbConnection);

      let secondsSinceStart = 0;
      let positionInCycle = pomodoro.position_in_cycle;
      let state = pomodoro.state;

      switch (pomodoro.state) {
        case 'IDLE':
          secondsSinceStart = 0;
          break;
        case 'PAUSED':
          secondsSinceStart = pomodoro.seconds_since_start_at_pause;
          break;
        case 'RUNNING':
          pomodoro.seconds_since_start_at_pause
            ? (secondsSinceStart =
            currentTime['CURRENT_TIMESTAMP()'] / 1000 -
            pomodoro.last_updated / 1000 +
            pomodoro.seconds_since_start_at_pause)
            : (secondsSinceStart =
            currentTime['CURRENT_TIMESTAMP()'] / 1000 -
            pomodoro.last_updated / 1000);
          break;
      }

      const MINUTE = 60;

      //Return offline if no action in 45 minutes
      if (
        currentTime['CURRENT_TIMESTAMP()'] / 1000 -
        pomodoro.last_updated / 1000 >=
        MINUTE * 45
      ) {
        state = 'OFFLINE';
      }

      //If timer is offline, then return initial values
      if (state === 'OFFLINE') {
        return { position: 0, secondsSinceStart: 0, state: state };
      } else {
        return {
          position: positionInCycle,
          secondsSinceStart: secondsSinceStart,
          state: state,
        };
      }
    }
  }
};

async function getPomodoro({ shareId, dbConnection }) {
  const result = await dbConnection.query(
    `SELECT * FROM pomodoros WHERE share_id = ?`,
    [shareId],
  );
  return result[0];
}

async function getDbTime(dbConnection) {
  const result = await dbConnection.query(`SELECT CURRENT_TIMESTAMP()`, []);
  return result[0];
}

export const pomodoroStatistics = async (
  _,
  { user_id: user_id },
  { dbConnection },
) => {
  if (!user_id) {
    return;
  }

  const pomodoroStatistics = await getPomodoroStatistics(user_id, dbConnection);

  return pomodoroStatistics;
};

async function getPomodoroStatistics(user_id, dbConnection) {
  const result = await dbConnection.query(
    `SELECT stats.id,stats.user_id, stats.finished_at,stats.duration, 
    JSON_ARRAYAGG(
      IF (
        tasks.task_id IS NULL, 
          NULL, 
          JSON_OBJECT('task_id', tasks.task_id, 'pomodoro_statistic_id', tasks.pomodoro_statistic_id, 'task_description', tasks.task_description)
          )
        ) 
      AS tasks
    FROM pomodoro_statistics AS stats
    LEFT JOIN tasks ON stats.id=tasks.pomodoro_statistic_id  
    WHERE stats.user_id = ?
    GROUP BY stats.id`,
    [user_id],
  );
  return result;
}

export const userPoints = async (_, { user_id }, { dbConnection }) => {
  const resultSum = await dbConnection.query(
    'SELECT sum(duration) AS resultSum FROM pomodoro_statistics WHERE user_id = ?',
    [user_id],
  );
  const usedPoints = await dbConnection.query(
    `SELECT used_points FROM users WHERE user_id = ?`,
    [user_id],
  );
  const countedPoints =
    Math.floor(resultSum[0].resultSum / 1500) - usedPoints[0].used_points;
  return countedPoints;
};

export const getCurrentTask = async (
  _,
  { user_id },
  { dbConnection },
) => {
  // const today = new Date();
  const result = await dbConnection.query(
    `SELECT 
      tasks.task_id AS task_id, 
      tasks.pomodoro_statistic_id AS pomodoro_statistic_id, 
      tasks.task_description AS task_description, 
      pomodoro_statistics.user_id AS user_id
     FROM pomodoro_statistics
     JOIN tasks ON pomodoro_statistics.id = tasks.pomodoro_statistic_id
     WHERE pomodoro_statistics.finished_at = DATE_FORMAT(NOW(), '%Y-%m-%d')
     AND pomodoro_statistics.user_id = ?
     ORDER BY tasks.task_id DESC LIMIT 1`,
    [ user_id]);
  return {
    task_id: result[0].task_id,
    user_id: result[0].user_id,
    pomodoro_statistic_id: result[0].pomodoro_statistic_id,
    task_description: result[0].task_description,
  };
};
