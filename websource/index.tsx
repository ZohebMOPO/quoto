import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Register } from "./Register";
import { Login } from "./Login";
import { getAccessToken } from "./accessToken";

const token = getAccessToken();
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  },
});

render(
  <ApolloProvider client={client}>
    <Register />
    <Login />
  </ApolloProvider>,
  document.getElementById("root")
);
