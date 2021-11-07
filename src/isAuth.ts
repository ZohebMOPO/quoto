import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Context } from "./Context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if(!authorization){
    throw new Error('Not authenticated');
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, "gyiyuijkiyiyshdkh");
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error('Not authenticated')
  }
  return next();
};
