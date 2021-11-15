import { sign } from "jsonwebtoken";

export const createAccessToken = (email: string) => {
  return sign({ emailId: email }, "gyiyuijkiyiyshdkh", {
    expiresIn: "30d",
  });
};

export const createRefreshToken = (email: string) => {
  return sign({ emailId: email }, "hfjdfhjdh", { expiresIn: "7m" });
};
