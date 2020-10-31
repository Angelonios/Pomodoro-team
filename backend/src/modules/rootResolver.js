import { mutations as UserMutations } from './user';
import { mutations as AnonymPomodoroMutations, queries as AnonymPomodoroQueries} from './pomodoro';

export default {
  Query: {
    ...AnonymPomodoroQueries
  },
  Mutation: {
    ...UserMutations,
    ...AnonymPomodoroMutations
  },
};
