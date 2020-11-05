import { mutations as UserMutations, queries as UserQueries } from './user';
import {
  mutations as AnonymPomodoroMutations,
  queries as AnonymPomodoroQueries,
} from './pomodoro';

export default {
  Query: {
    ...UserQueries,
    ...AnonymPomodoroQueries,
  },
  Mutation: {
    ...UserMutations,
    ...AnonymPomodoroMutations,
  },
};
