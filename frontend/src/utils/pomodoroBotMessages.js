import { mapping } from 'src/utils/pomodoroBotMapping';
import { getPomodoroComponent } from 'src/utils/pomodoroCycle';

//Example message with all possible coeficients. Ideal for copy&paste!
/* const exampleMessage = {
  text: 'Text',
  icon: 'happy',
  coefs: {
    components: [
      { type: mapping.components.pomodoro, coef: 1 },
      { type: mapping.components.shortBreak, coef: 1 },
      { type: mapping.components.longBreak, coef: 1 },
    ],
    timerStates: [
      { type: mapping.timerStates.idle, coef: 1 },
      { type: mapping.timerStates.running, coef: 1 },
      { type: mapping.timerStates.paused, coef: 1 },
      { type: mapping.timerStates.offline, coef: 1 },
    ],
    userStates: [
      { type: mapping.userStates.anonymous, coef: 1 },
      { type: mapping.userStates.loggedIn, coef: 1 },
    ],
    statisticsBreakPoints: [
      { type: mapping.statisticsBreakPoints.default, coef: 1 },
      { type: mapping.statisticsBreakPoints.justStarted, coef: 1 },
      { type: mapping.statisticsBreakPoints.over4Hours, coef: 1 },
      { type: mapping.statisticsBreakPoints.over6Hours, coef: 1 },
    ],
    timeOfDay: [
      { type: mapping.timeOfDay.morning, coef: 1 },
      { type: mapping.timeOfDay.afternoon, coef: 1 },
      { type: mapping.timeOfDay.evening, coef: 1 },
    ],
  },
}; */

export const messages = [
  {
    text: "Hello ___DISPLAY_NAME___! Let's get some work done!",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.idle, coef: 1 },
        { type: mapping.timerStates.running, coef: 0 },
        { type: mapping.timerStates.paused, coef: 0 },
        { type: mapping.timerStates.offline, coef: 1 },
      ],
      userStates: [
        { type: mapping.userStates.anonymous, coef: -10 },
        { type: mapping.userStates.loggedIn, coef: 1 },
      ],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.default, coef: -10 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 1 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: -10 },
        { type: mapping.statisticsBreakPoints.over6Hours, coef: -10 },
      ],
    },
  },
  {
    text: 'Good ___TIME_OF_DAY___, ___DISPLAY_NAME___!',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.idle, coef: 1 },
        { type: mapping.timerStates.running, coef: 0 },
        { type: mapping.timerStates.paused, coef: 0 },
        { type: mapping.timerStates.offline, coef: 1 },
      ],
      userStates: [
        { type: mapping.userStates.anonymous, coef: -10 },
        { type: mapping.userStates.loggedIn, coef: 1 },
      ],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.default, coef: -10 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 1 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: -10 },
        { type: mapping.statisticsBreakPoints.over6Hours, coef: -10 },
      ],
    },
  },
  {
    text: "Let's work!",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.idle, coef: 0 },
        { type: mapping.timerStates.running, coef: 1 },
        { type: mapping.timerStates.paused, coef: 1 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
    },
  },
  {
    text: "Don't worry, I'll notify you when your pomodoro is done.",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.idle, coef: 0 },
        { type: mapping.timerStates.running, coef: 1 },
        { type: mapping.timerStates.paused, coef: 1 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
    },
  },
  {
    text: "Let's start a productive day!",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.idle, coef: 0 },
        { type: mapping.timerStates.running, coef: 1 },
        { type: mapping.timerStates.paused, coef: 1 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
      timeOfDay: [
        { type: mapping.timeOfDay.morning, coef: 1 },
        { type: mapping.timeOfDay.evening, coef: 0 },
      ],
    },
  },
  {
    text: 'Enjoy your break!',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
    },
  },
  {
    text:
      'Breaks should not be optional. Do not skip them to boost your productivity!',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
    },
  },
  {
    text: 'Time to relax.',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
    },
  },
  /*   {
    text: `Your first today's pomodoro is over. Now it's time for your ${
      getPomodoroComponent(1).seconds / 60
    }-minute break.`,
  }, */
  {
    text:
      'Great job! You have worked for ___TODAYS_STATS___ today so far! Keep up the good work!',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [
        { type: mapping.userStates.anonymous, coef: -10 },
        { type: mapping.userStates.loggedIn, coef: 1 },
      ],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.over6Hours, coef: 1 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 0 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: 1 },
      ],
    },
  },
  {
    text: "You're on fire! ___TODAYS_STATS___ and counting!",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [
        { type: mapping.userStates.anonymous, coef: -10 },
        { type: mapping.userStates.loggedIn, coef: 1 },
      ],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.over6Hours, coef: 1 },
        { type: mapping.statisticsBreakPoints.default, coef: 0 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 0 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: 1 },
      ],
    },
  },
  {
    text:
      "Awesome! Looks like we have a winner! Your today's score is ___TODAYS_STATS___.",
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [
        { type: mapping.userStates.anonymous, coef: -10 },
        { type: mapping.userStates.loggedIn, coef: 1 },
      ],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.over6Hours, coef: 1 },
        { type: mapping.statisticsBreakPoints.default, coef: 0 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 0 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: 0 },
      ],
    },
  },
  {
    text:
      'You can [register](registrationPage) to gain access to your statistics. Already registered? [Log-in here!](loginPage)',
    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },

  {
    text:
      'If you [register](registrationPage), you will be able to see your stats! Already registered? [Log-in here!](loginPage)',
    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },
  {
    text:
      'Did you know? [Registration](registrationPage) gives you ability to create a team and invite your teammates! Already registered? [Log-in here!](loginPage)',
    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },
];
