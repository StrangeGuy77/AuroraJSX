import { v4 } from "uuid";
import * as Redis from "ioredis";

// http://localhost:4000
// http://site.com
// => https://site.com/confirm/<id>

export const confirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis.Redis
) => {
  const id = v4();
  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};
