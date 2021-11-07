import { User } from "../entities/User";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { compare } from "bcryptjs";
import { createAccessToken } from "../utils/createToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class LoginResolver {

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    return {
      accessToken: createAccessToken(user.email),
      user,
    };
  }
}
