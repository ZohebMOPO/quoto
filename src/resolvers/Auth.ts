import { hash } from "bcryptjs";
import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { sign } from "jsonwebtoken";
import { sendConfirmationMail } from "src/utils/confirmationUrl";

@Resolver()
export class RegisterResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 16);

    const token = sign({ emailId: email }, "gyiyuijkiyiyshdkh");

    try {
      await User.insert({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      });
      sendConfirmationMail(firstName, email, token);
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
