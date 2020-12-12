import {
  convertSecondsToHours,
  convertSecondsToPrettyString,
} from 'src/utils/pomodoroUtils';
import { messages } from 'src/utils/pomodoroBotMessages';
import { mapping } from 'src/utils/pomodoroBotMapping';

const getTimeOfDay = () => {
  const currentHour = new Date().getHours();
  if (0 <= currentHour && currentHour < 12) {
    return mapping.timeOfDay.morning;
  }
  if (12 <= currentHour && currentHour < 18) {
    return mapping.timeOfDay.afternoon;
  }
  if (18 <= currentHour && currentHour <= 24) {
    return mapping.timeOfDay.evening;
  }
};

const getTodaysTimeBreakpoint = (seconds) => {
  const hours = convertSecondsToHours(seconds);
  if (hours > 6) {
    return mapping.statisticsBreakPoints.over6Hours;
  }
  if (hours > 4) {
    return mapping.statisticsBreakPoints.over4Hours;
  }
  if (seconds === 0) {
    return mapping.statisticsBreakPoints.justStarted;
  }
  return mapping.statisticsBreakPoints.default;
};

const getUserState = (userStateObj) => {
  if (userStateObj.user) return mapping.userStates.loggedIn;
  else return mapping.userStates.anonymous;
};

const defaultScore = 0.5;

function calculateScore({ message, pomodoroState, userState, todaysSeconds }) {
  let score = 0;
  //Components
  if (message.coefs?.components) {
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
  if (message.coefs?.timerStates) {
    const filteredTimerState = message.coefs.timerStates.filter(
      (timerState) => pomodoroState.timerState === timerState.type,
    );
    filteredTimerState.length > 0
      ? (score += filteredTimerState[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  //User states
  if (message.coefs?.userStates) {
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
  if (message.coefs?.statisticsBreakPoints) {
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
  if (message.coefs?.timeOfDay) {
    const filteredTimeOfDay = message.coefs.timeOfDay.filter(
      (coefTimeOfDay) => getTimeOfDay() === coefTimeOfDay.type,
    );
    filteredTimeOfDay.length > 0
      ? (score += filteredTimeOfDay[0].coef)
      : (score += defaultScore);
  } else {
    score += defaultScore;
  }
  return score / 5;
}

const completeString = ({
  message,
  pomodoroState,
  userState,
  todaysSeconds,
}) => {
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
    convertSecondsToPrettyString(todaysSeconds),
  );

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
