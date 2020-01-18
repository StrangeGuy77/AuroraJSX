import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
import { User } from "../../entity/User";
import { invalidLogin } from "./errorMsgs";
import * as bcrypt from "bcryptjs";

const errorResponse = (path: string) => [
  {
    path,
    message: invalidLogin
  }
];

export const resolvers: ResolverMap = {
  Query: {
    bye2: () => "Bye"
  },
  Mutation: {
    login: async (
      _: any,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return errorResponse("email");
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        return errorResponse("password");
      }
      if (!user.confirmed) {
        return errorResponse("not confirmed");
      }

      // Login success
      session.userId = user.id;

      return null;
    }
  }
};
