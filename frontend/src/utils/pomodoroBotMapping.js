export const mapping = {
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
