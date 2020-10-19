import { mutations as UserMutations } from './user';

export default {
  Query: {
    todo: async () => {
      return new Date().toISOString();
    },
  },
  Mutation: {
    ...UserMutations,
  },
};
