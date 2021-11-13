import { useRegisterMutation } from "./generated/graphql";
import React, { useState } from "react";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const response = await register({
          variables: {
            firstName,
            lastName,
            email,
            password,
          },
        });

        console.log(response);
      }}
    >
      <div>
        <div>
          <input
            value={firstName}
            placeholder="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            value={lastName}
            placeholder="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
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
      <button type="submit">register</button>
    </form>
  );
}

export default Register;
