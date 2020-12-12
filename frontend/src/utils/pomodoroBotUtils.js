import { convertSecondsToHours } from 'src/utils/pomodoroUtils';
//2nd version 20201208

const mapping = {
  components: {
    pomodoro: 1,
    shortBreak: 2,
    longBreak: 3,
  },
  timerStates: {
    idle: 'IDLE',
    running: 'RUNNING',
    paused: 'PAUSED',
    offline: 'OFFLINE',
  },
  statisticsBreakPoints: {
    default: 'DEFAULT',
    justStarted: 'JUST_STARTED',
    over6Hours: 'OVER_6_HOURS',
    over4Hours: 'OVER_4_HOURS',
  },
  timeOfDay: {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
  },
  userStates: {
    anonymous: 'ANONYMOUS',
    loggedIn: 'LOGGED_IN',
  },
};

const getTimeOfDay = () => {
  const currentHour = new Date().getHours();
  if (0 <= currentHour && currentHour < 12) {
    return 'morning';
  }
  if (12 <= currentHour && currentHour < 18) {
    return 'afternoon';
  }
  if (18 <= currentHour && currentHour <= 24) {
    return 'evening';
  }
};

const getTodaysTimeBreakpoint = (seconds) => {
  const hours = convertSecondsToHours(seconds);
  if (hours > 6) {
    return 'OVER_6_HOURS';
  }
  if (hours > 4) {
    return 'OVER_4_HOURS';
  }
  if (seconds === 0) {
    return 'JUST_STARTED';
  }
  return 'DEFAULT';
};

const getUserState = (userStateObj) => {
  if (userStateObj.user) return mapping.userStates.loggedIn;
  else return mapping.userStates.anonymous;
};

const defaultScore = 0.5;

const messages = [
  {
    text:
      "Hello ___DISPLAY_NAME___! Let's get some work done! It is ___TIME_OF_DAY___ and you have been working for ___TODAYS_STATS___ seconds today!",
    icon: 'happy',
    coefs: {},
  },
  {
    text: "Let's work break!",
    icon: 'happy',
    coefs: {
      /*       components: [
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ], */
    },
  },
];

function calculateScore({ message, pomodoroState, userState, todaysSeconds }) {
  console.log(getTimeOfDay());
  console.log(getTodaysTimeBreakpoint(todaysSeconds));
  let score = 0;
  //Components
  if (message.coefs.components) {
    const filteredComponent = message.coefs.components.filter(
      (component) => pomodoroState.componentType === component.type,
    );
    filteredComponent.length > 0
      ? (score += filteredComponent[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  //Timer states
  if (message.coefs.timerStates) {
    const filteredTimerState = message.coefs.timerStates.filter(
      (timerState) => pomodoroState.timerState === timerState.type,
    );
    console.log('timerState', filteredTimerState);
    filteredTimerState.length > 0
      ? (score += filteredTimerState[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  //User states
  if (message.coefs.userStates) {
    const filteredUserState = message.coefs.userStates.filter(
      (coefUserState) => getUserState(userState) === coefUserState.type,
    );
    filteredUserState.length > 0
      ? (score += filteredUserState[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  //Statistics
  if (message.coefs.statisticsBreakPoints) {
    const filteredStatisticsBreakPoints = message.coefs.statisticsBreakPoints.filter(
      (coefStatisticsBreakPoint) =>
        getTodaysTimeBreakpoint(todaysSeconds) ===
        coefStatisticsBreakPoint.type,
    );
    filteredStatisticsBreakPoints.length > 0
      ? (score += filteredStatisticsBreakPoints[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  //Time of day
  if (message.coefs.timeOfDay) {
    const filteredTimeOfDay = message.coefs.timeOfDay.filter(
      (coefTimeOfDay) => getTimeOfDay() === coefTimeOfDay.type,
    );
    filteredTimeOfDay.length > 0
      ? (score += filteredTimeOfDay[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  console.log('score', score);
  return score / 5;
}

const completeString = ({
  message,
  pomodoroState,
  userState,
  todaysSeconds,
}) => {
  console.log('usrStt', userState);
  const messageToReplace = message.text;
  let replacedMessage = '';
  replacedMessage = messageToReplace.replaceAll(
    '___DISPLAY_NAME___',
    userState.user?.display_name,
  );
  replacedMessage = replacedMessage.replaceAll(
    '___TIME_OF_DAY___',
    getTimeOfDay(),
  );
  replacedMessage = replacedMessage.replaceAll(
    '___TODAYS_STATS___',
    todaysSeconds,
  );
  //console.log('rplcdmsg', replacedMessage);
  console.log('rplcdmsg', replacedMessage);

  return replacedMessage;
};

// Score in range <0, 1>.
// Banned metrics have score of -1.
// Overall score is counted as (weighted) average.
//E.g.: 0.3 + 0.9 + 0.6 + 0.6 / 4 = 0.6.
//Example with banned metric: 0.3 + 0.9 + (-1) + 0.2 / 4 = 0.1

export function getMessage({ pomodoroState, userState, todaysSeconds }) {
  const evaluatedMessages = messages.map((message) => {
    return {
      text: message.text,
      score: calculateScore({
        message,
        pomodoroState,
        userState,
        todaysSeconds,
      }),
    };
  });
  console.log(evaluatedMessages);
  const maxScore = Math.max(...evaluatedMessages.map((o) => o.score), 0);
  const maxScoreMessages = evaluatedMessages.filter(
    (message) => message.score === maxScore,
  );
  const messageToReturn = completeString({
    message:
      maxScoreMessages[Math.floor(Math.random() * maxScoreMessages.length)],

    pomodoroState,
    userState,
    todaysSeconds,
  });

  return messageToReturn;
}
