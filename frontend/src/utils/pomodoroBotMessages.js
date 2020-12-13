import { mapping, tomato } from 'src/utils/pomodoroBotMapping';

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
    avatar: tomato.veryHappy,
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
    text: 'Ready to start?',
    avatar: tomato.chilled,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.running, coef: 0 },
        { type: mapping.timerStates.paused, coef: 0 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
    },
  },
  {
    text: "I'm ready! And you?",
    avatar: tomato.chilled,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.running, coef: 0 },
        { type: mapping.timerStates.paused, coef: 0 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
    },
  },
  {
    text: 'Ready? Click the button one more time!',
    avatar: tomato.veryHappy,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 1 },
        { type: mapping.components.shortBreak, coef: 0 },
        { type: mapping.components.longBreak, coef: 0 },
      ],
      timerStates: [
        { type: mapping.timerStates.running, coef: 0 },
        { type: mapping.timerStates.paused, coef: 0 },
        { type: mapping.timerStates.offline, coef: 0 },
      ],
    },
  },
  {
    text: "Don't worry. I'll notify you when your Pomodoro is at its end.",
    avatar: tomato.chilled,
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
    avatar: tomato.veryHappy,
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
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.justStarted, coef: 1 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: 0 },
        { type: mapping.statisticsBreakPoints.over6Hours, coef: 0 },
      ],
      timeOfDay: [{ type: mapping.timeOfDay.evening, coef: 0 }],
    },
  },
  {
    text: 'Enjoy your break!',
    avatar: tomato.chilled,
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
    avatar: tomato.chilled,
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
      "Did you know? Pomodoro Technique was developed by Francesco Cirillo in the late 80's. You can follow him at @cirillof on Twitter.",
    avatar: tomato.chilled,
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
      'Pomodoro technique can be a great way to fight against procrastination.',
    avatar: tomato.amazed,
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
      'As a logged-in user, you can create teams, invite new team members, and then see their current status.',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [{ type: mapping.userStates.anonymous, coef: -10 }],
    },
  },
  {
    text:
      'Tip: If you join our beta program, you can plant trees! For every finished Pomodoro, you get points that you can later exchange for a tree!',
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [{ type: mapping.userStates.anonymous, coef: -10 }],
    },
  },
  {
    text:
      'Great job! You have worked for ___TODAYS_STATS___ today so far! Keep up the good work!',
    avatar: tomato.veryHappy,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [{ type: mapping.userStates.anonymous, coef: -10 }],
      statisticsBreakPoints: [
        { type: mapping.statisticsBreakPoints.over6Hours, coef: 1 },
        { type: mapping.statisticsBreakPoints.justStarted, coef: 0 },
        { type: mapping.statisticsBreakPoints.over4Hours, coef: 1 },
      ],
    },
  },
  {
    text: "You're on fire! ___TODAYS_STATS___ and counting!",
    avatar: tomato.amazed,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [{ type: mapping.userStates.anonymous, coef: -10 }],
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
      'Awesome! Looks like we have a winner! Your score today is ___TODAYS_STATS___!',
    avatar: tomato.amazed,
    coefs: {
      components: [
        { type: mapping.components.pomodoro, coef: 0 },
        { type: mapping.components.shortBreak, coef: 1 },
        { type: mapping.components.longBreak, coef: 1 },
      ],
      userStates: [{ type: mapping.userStates.anonymous, coef: -10 }],
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
      'You can ___REGISTER___ to gain access to your statistics. Already registered? ___LOG_IN_HERE___!',
    avatar: tomato.veryHappy,

    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },

  {
    text:
      'If you ___REGISTER___, you will be able to see your stats! Already registered? ___LOG_IN_HERE___!',
    avatar: tomato.chilled,

    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },
  {
    text:
      'Did you know? ___REGISTRATION___ gives you ability to create a team and invite your teammates! Already registered? ___LOG_IN_HERE___!',
    coefs: {
      userStates: [
        { type: mapping.userStates.anonymous, coef: 1 },
        { type: mapping.userStates.loggedIn, coef: -10 },
      ],
    },
  },
];
