import { useLoginMutation } from "./generated/graphql";
import React, { useState } from "react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const response = await login({
          variables: {
            email,
            password,
          },
        });
        
        console.log(response);
      }}
    >
      <div>
        <input
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};
