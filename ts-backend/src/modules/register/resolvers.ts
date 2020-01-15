import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { GQL } from "../../types/graphql";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupErr";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(5)
    .max(255)
    .email("Not valid email, example: 'example@host.com'"),
  password: yup
    .string()
    .min(6)
    .max(255)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "Bye"
  },
  Mutation: {
    register: async (_: any, args: GQL.IRegisterOnMutationArguments) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }

      const { email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: "already taken"
          }
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });
      await user.save();
      return null;
    }
  }
};
