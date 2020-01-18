import { ResolverMap } from "../../types/graphql-utils";
import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { GQL } from "../../types/graphql";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupErr";
import {
  duplicatedEmail,
  emailNotLongEnough,
  emailIsTooLong,
  notValidEmail,
  passwordIsNotLongEnough
} from "./errorMsgs";
// import { confirmEmailLink } from "../../utils/emailConfirmLink";
// import { sendEmail } from "../../utils/sendEmail";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(5, emailNotLongEnough)
    .max(255, emailIsTooLong)
    .email(notValidEmail),
  password: yup
    .string()
    .min(6, passwordIsNotLongEnough)
    .max(255)
});

export const resolvers: ResolverMap = {
  Query: {
    bye: () => "Bye"
  },
  Mutation: {
    register: async (
      _: any,
      args: GQL.IRegisterOnMutationArguments
      // { redis, url }
    ) => {
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
            message: duplicatedEmail
          }
        ];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });
      await user.save();
      // await sendEmail(email, await confirmEmailLink(url, user.id, redis));

      return null;
    }
  }
};
