import { request } from "graphql-request";
import { User } from "../../entity/User";
import {
  duplicatedEmail,
  emailNotLongEnough,
  notValidEmail,
  passwordIsNotLongEnough
} from "./errorMsgs";
import { createTypeOrmConn } from "../../utils/ormconn";

beforeAll(async () => {
  await createTypeOrmConn();
});

const email = "tom@tom.com";
const password = "bobxxx";

export const registerMutation = (e: string, p: string) => `
  mutation {
     register(email: "${e}", password: "${p}") {
       path
       message
     }
  }
`;

describe("Register user", () => {
  it("Check for duplicated emails", async () => {
    // Make sure users can be registered
    const response = await request(
      process.env.TEST_HOST as string,
      registerMutation(email, password)
    );
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual(email);
    expect(users[0].password).not.toEqual(password);

    const response2: any = await request(
      process.env.TEST_HOST as string,
      registerMutation(email, password)
    );
    expect(response2.register).toHaveLength(1);
    expect(response2.register[0]).toEqual({
      path: "email",
      message: duplicatedEmail
    });
  }, 30000);

  it("Catch bad email", async () => {
    const response3: any = await request(
      process.env.TEST_HOST as string,
      registerMutation("b", password)
    );
    expect(response3).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "email",
          message: notValidEmail
        }
      ]
    });
  });

  it("Catch bad password", async () => {
    const response4: any = await request(
      process.env.TEST_HOST as string,
      registerMutation(email, "x")
    );
    expect(response4).toEqual({
      register: [
        {
          path: "password",
          message: passwordIsNotLongEnough
        }
      ]
    });
  });

  it("Catch bad password and bad email", async () => {
    const response5: any = await request(
      process.env.TEST_HOST as string,
      registerMutation("b", "x")
    );
    expect(response5).toEqual({
      register: [
        {
          path: "email",
          message: emailNotLongEnough
        },
        {
          path: "email",
          message: notValidEmail
        },
        {
          path: "password",
          message: passwordIsNotLongEnough
        }
      ]
    });
  });
});
