import { request } from "graphql-request";
import { User } from "../../entity/User";
import { invalidLogin } from "./errorMsgs";
import { registerMutation } from "../register/register.test";

const email = "tom@bob.com";
const pass = "xdasdasd";

const loginMutation = (e: string, p: string) => `
    mutation {
        login(email: "${e}", password: "${p}") {
            path
            message
        }
    }
`;

const login = async (e: string, p: string, errPath: string) => {
  await request(process.env.TEST_HOST as string, registerMutation(e, p));
  const response = await request(
    process.env.TEST_HOST as string,
    loginMutation(e, p)
  );
  expect(response).toEqual({
    login: [
      {
        path: errPath,
        message: invalidLogin
      }
    ]
  });
};

describe("Login tests", () => {
  it("Check succesful login", async () => {
    return true;
  });

  it("Check bad email login", async () => {
    await login("bad_email", "whatever", "email");
  }, 30000);

  it("Check not confirmed email login", async () => {
    await request(
      process.env.TEST_HOST as string,
      registerMutation(email, pass)
    );
    await login(email, pass, "not confirmed");
    await User.update({ email }, { confirmed: true });
    await login(email, "142214214241", "password");

    const response = await request(
      process.env.TEST_HOST as string,
      loginMutation(email, pass)
    );
    expect(response).toEqual({
      login: null
    });
  });
});
