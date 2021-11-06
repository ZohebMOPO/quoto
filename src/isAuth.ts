import { ApolloError } from "apollo-server-errors";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./Context";

export const isAuth: MiddlewareFn<Context> = (
  { context },
  next
): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!context.req.session || !context.req.session.userId) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
