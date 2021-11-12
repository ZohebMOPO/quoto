import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const hey = gql`
    query Hey {
      hello
    }
  `;

  const { loading, error, data } = useQuery(hey);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :/</p>;

  return (
    <div>
      <h2>{JSON.stringify(data)} 🚀</h2>
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
