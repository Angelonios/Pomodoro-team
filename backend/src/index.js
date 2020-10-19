import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';

dotenv.config();

const typeDefs = gql`
  type Query {
    todo: String!
  }

  type AuthInfo {
    token: String!
  }

  type Mutation {
    signin(email: String!, password: String!): AuthInfo!
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
