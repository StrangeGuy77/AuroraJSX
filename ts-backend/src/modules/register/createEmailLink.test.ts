import { confirmEmailLink } from "../../utils/emailConfirmLink";
import { createTypeOrmConn } from "../../utils/ormconn";
import { User } from "../../entity/User";
import * as Redis from "ioredis";
import fetch from "node-fetch";
import { Connection } from "typeorm";

let userId: string;
let conn: Connection;
const redis = new Redis();

beforeAll(async () => {
  conn = await createTypeOrmConn();
  const user = await User.create({
    email: "bob@bob.com",
    password: "123456"
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

describe("Make sure createEmailLink works", () => {
  it("creating confirm link", async () => {
    const url = await confirmEmailLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    );
    const response = await fetch(url);
    const text = await response.text();
    expect(text).toEqual("ok");
    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });
});
