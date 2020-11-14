import { mutations as UserMutations, queries as UserQueries } from './user';
import {
  mutations as AnonymPomodoroMutations,
  queries as AnonymPomodoroQueries,
} from './pomodoro';
import { queries as TeamQueries } from './team';

export default {
  Query: {
    ...UserQueries,
    ...AnonymPomodoroQueries,
    ...TeamQueries,
  },
  Mutation: {
    ...UserMutations,
    ...AnonymPomodoroMutations,
  },
};
