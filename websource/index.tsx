import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Register from "./Register";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Register />
  </ApolloProvider>,
  document.getElementById("root")
);
