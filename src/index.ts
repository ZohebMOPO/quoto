import "reflect-metadata";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import cors from "cors";
import cloudinary from "cloudinary";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./resolvers/Auth";
import { User } from "./entities/User";
import { LoginResolver } from "./resolvers/Login";
import { QuoteResolver } from "./resolvers/Quote.resolver";
import { verify } from "jsonwebtoken";
import { createAccessToken } from "./utils/createToken";

dotenv.config();

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.sid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, "hfjdfhjdh");
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await User.findOne({ where: { email: payload.emailId } });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    return res.send({ ok: true, accessToken: createAccessToken(user?.email) });
  });

  cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, LoginResolver, QuoteResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await createConnection();

  apolloServer.applyMiddleware({ app, cors: false });

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
