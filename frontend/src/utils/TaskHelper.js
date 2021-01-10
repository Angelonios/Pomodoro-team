const CURRENT_TASK = 'CURRENT_TASK';

/**
 * This function checks if new task isn't similar to ones already in
 * localStorage. If not similar the task will be added into localStorage, and
 * also will be persisted on the backend. Else a warning will be displayed to
 * the user, that the task is very similar to ones he has.
 * @param newTask
 */
export const addTask = (newTask, auth, saveTaskMutation) => {
  const currentTask = localStorage.getItem(CURRENT_TASK);

  if (currentTask === null) {
    localStorage.setItem(CURRENT_TASK, newTask);

    return true;
  }

  if (!areTasksSimilar(currentTask, newTask)) {
    localStorage.setItem('task-' + new Date().getTime(), currentTask);
    localStorage.setItem(CURRENT_TASK, newTask);
    persistTask(newTask, auth, saveTaskMutation);

    return true;
  }

  return false;
};

export const GetCurrentTask = () => {
  return localStorage.getItem(CURRENT_TASK) ?? '';
};

/**
 * This function compares two tasks and determines if they are similar.
 * First in compares word count. If the word count doesn't match between two
 * tasks, then tasks are not same.
 * Otherwise when the word count between both tasks matches the function then
 * compares edit distances between each words in both tasks and counts the
 * number of similar words. If the edit distance between two words is 1 or 0,
 * then the words are considered similar.
 * If the number of similar words is same as the word count in both tasks then
 * these tasks are similar. Otherwise they are not similar.
 * @param task1
 * @param task2
 */
const areTasksSimilar = (task1, task2) => {
  const wordsInTask1 = task1.split(' ');
  const wordsInTask2 = task2.split(' ');

  const wordCountTask1 = wordsInTask1.length;
  const wordCountTask2 = wordsInTask2.length;

  if (wordCountTask1 !== wordCountTask2) return false;

  const similarWords = wordsInTask1
    .map((word1, index) => {
      const word2 = wordsInTask2[index];
      const editDistance = getDistanceBetweenStrings(word1, word2);
      return !(editDistance > 1);
    })
    .filter(Boolean).length;

  if (similarWords === wordCountTask1) {
    return true;
  }

  return false;
};

/**
 * This function calculates Levenshtein distance metric between two strings.
 * The distance measures number of edits (deletion, insertion and replacement)
 * needed to make in order to get same strings.
 * @param string1
 * @param string2
 * @returns {number|*}
 */
const getDistanceBetweenStrings = (string1, string2) => {
  if (!string1 || string1.length === 0) {
    return string2.length;
  }
  if (!string2 || string2.length === 0) {
    return string1.length;
  }
  let [head1, ...tail1] = string1;
  let [head2, ...tail2] = string2;
  if (head1 === head2) {
    return getDistanceBetweenStrings(tail1, tail2);
  }
  const l1 = getDistanceBetweenStrings(string1, tail2);
  const l2 = getDistanceBetweenStrings(tail1, string2);
  const l3 = getDistanceBetweenStrings(tail1, tail2);
  return 1 + Math.min(l1, l2, l3);
};

const persistTask = (task, auth, saveTaskMutation) => {
  saveTaskMutation({
    variables: {
      user_id: auth.user.user_id,
      task_description: task,
    },
  });
  // .catch((err) => logger.error(err));
};
