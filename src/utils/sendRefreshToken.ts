import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("sid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
