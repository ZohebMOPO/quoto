import "reflect-metadata";
import dotenv from 'dotenv';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolvers/Auth";

dotenv.config();

(async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await createConnection();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Open localhost:4000/graphql");
  });
})();
