import "reflect-metadata";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolvers/Auth";
import { User } from "./entities/User";
import { LoginResolver } from "./resolvers/Login";
import { QuoteResolver } from "./resolvers/Quote.resolver";

dotenv.config();

(async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, LoginResolver, QuoteResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await createConnection();

  apolloServer.applyMiddleware({ app });

  app.get("/confirm/:token", async (req, res) => {
    try {
      await User.findOne({ where: { confirmationCode: req.params.token } });
      res.json({ Yo: "It's working" });
    } catch (err) {
      console.log(err);
    }
  });

  app.listen(4000, () => {
    console.log("Open localhost:4000/graphql");
  });
})();
