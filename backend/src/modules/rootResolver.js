import { mutations as UserMutations, queries as UserQueries } from './user';
import {
  mutations as AnonymPomodoroMutations,
  queries as AnonymPomodoroQueries,
} from './pomodoro';
import { queries as TeamQueries, mutations as TeamMutations } from './team';

export default {
  Query: {
    ...UserQueries,
    ...AnonymPomodoroQueries,
    ...TeamQueries,
  },
  Mutation: {
    ...UserMutations,
    ...AnonymPomodoroMutations,
    ...TeamMutations,
  },
};
