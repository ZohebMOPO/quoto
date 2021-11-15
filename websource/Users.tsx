import { useUsersQuery } from "./generated/graphql";
import React from "react";

export const Users = () => {
  const { data, loading } = useUsersQuery();
  if(loading){
    return <p>loading...</p>
  }
  if (data) {
    console.log(data);
  }
  return <div>{JSON.stringify(data)}</div>;
};
