import aserver from "apollo-server";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import pkg from 'graphql-subscriptions';
const { PubSub } = pkg;

const pubsub = new PubSub()

const startServer = async () => {
  const { ApolloServer } = aserver;
  const server = new ApolloServer({typeDefs, resolvers, context:({ req, res}) => ({ req, res, pubsub}) })
  
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

startServer();