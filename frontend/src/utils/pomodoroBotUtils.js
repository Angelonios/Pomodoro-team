//2nd version 20201208

/* const metrics = [
  {
    components: [pomodoro, shortBreak, longBreak],
  },
  {
    timerStates: [offline, idle, running, paused],
  },
  {
    userStates: [anonymous, justStarted, oneRecord, over4Hours, over6Hours],
  },
  {
    timeOfDay: [morning, evening, rest],
  },
]; */

const defaultScore = 0.5;

const messages = [
  {
    text: "Let's work!",
    icon: 'happy',
    score: [
      /*       { metrics: metrics.components.pomodoro, score: 0.5 },
      { metrics: metrics.timerStates, score: 1.0 }, */
    ],
  },
  {
    text: "Let's work2!",
    icon: 'happy',
    score: [
      /*       { metrics: metrics.components.pomodoro, score: 0.5 },
      { metrics: metrics.timerStates, score: 1.0 }, */
    ],
  },
];

function calculateScore(message, component, timerState, userState, timeOfDay) {
  let score = 0;
  return score;
}

// Score in range <0, 1>.
// Banned metrics have score of -1.
// Overall score is counted as (weighted) average.
//E.g.: 0.3 + 0.9 + 0.6 + 0.6 / 4 = 0.6.
//Example with banned metric: 0.3 + 0.9 + (-1) + 0.2 / 4 = 0.1

export function getMessage({ component, pomodoroState, userState }) {
  const evaluatedMessages = messages.map((message) => {
    return {
      text: message.text,
      score: calculateScore(message, component, pomodoroState, userState),
    };
  });
  return evaluatedMessages[0].text;
}
