import { startServer } from "../startServer";

export const setup = async () => {
  const app = await startServer();
  const x = app.address();
  // tslint:disable-next-line: one-variable-per-declaration
  const y: any[] | any | any = x;
  const port = y.port;
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
  console.log(process.env.TEST_HOST);
};
