import { request } from "graphql-request";
import { User } from "../../entity/User";
import { startServer } from "../../startServer";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const x = app.address();
  // tslint:disable-next-line: one-variable-per-declaration
  const y: any[] | any | any = x;
  const port = y.port;
  getHost = () => `http://127.0.0.1:${port}`;
});

const email = "tom@bob.com";
const password = "bob";

const mutation = `
  mutation {
     register(email: "${email}", password: "${password}") {
       path
       message
     }
  }
`;

test("Register user", async () => {
  const response = await request(getHost(), mutation);
  expect(response).toEqual({ register: null });
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  expect(users[0].email).toEqual(email);
  expect(users[0].password).not.toEqual(password);

  const response2: any = await request(getHost(), mutation);
  expect(response2.register).toHaveLength(1);
  expect(response2.register[0].path).toEqual("email");
});
