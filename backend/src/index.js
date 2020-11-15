import { ApolloServer, gql } from 'apollo-server-express';
import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { getConnection } from './libs/connection';
import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Query {
    pomodoro(shareId: String!): Pomodoro
    users: [User!]!
    user(user_id: Int!): User
    teams: [Team!]!
    team(team_id: Int!): Team
    userTeams(user_id: Int!): [Team]!
    getUsersFromTeam(team_id: Int!): [User!]!
    teamMembersPomodoro(team_id: Int!): [UsersPomodoro!]!
    userPomodoroIds(user_id: Int!): Ids!
  }

  type Pomodoro {
    position: String!
    secondsSinceStart: Int!
    isOffline: Boolean!
    ids: Ids!
  }

  type UsersPomodoro {
    share_id: String!
    email: String!
    user_id: Int!
  }

  type Ids {
    communication_id: String!
    share_id: String!
  }

  type User {
    user_id: Int!
    email: String!
  }

  type userTeams {
    user_id: Int!
    teams: [Team!]!
  }

  type Mutation {
    SignIn(email: String!, password: String!): AuthInfo!

    SignUp(
      email: String!
      password: String!
      communicationId: String!
    ): AuthInfo!

    updatePomodoro(
      running: Boolean!
      position: Int!
      communicationId: String!
      shareId: String!
    ): String!

    CreateTeam(teamName: String!, owner_id: Int!): Team!

    AddUserToTeam(team_id: Int!, email: String!): Boolean

    LeaveTeam(team_id: Int!, user_id: Int!): Boolean

    DeleteTeam(teamName: String!, email: String!): String!
  }

  type AuthUser {
    user_id: Int!
    email: String!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Team {
    team_id: Int!
    owner_id: Int!
    name: String!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  let dbConnection = null;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      if (!dbConnection) {
        dbConnection = await getConnection();
      }
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
