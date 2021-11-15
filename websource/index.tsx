import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  concat,
} from "@apollo/client";
import { Register } from "./Register";
import { Login } from "./Login";
import { getAccessToken } from "./accessToken";
import { Users } from "./Users";

const token = getAccessToken();

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  console.log("set");
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});

render(
  <ApolloProvider client={client}>
    <Register />
    <Login />
    <br />
    <Users />
  </ApolloProvider>,
  document.getElementById("root")
);
