import { GraphQLServer } from "graphql-yoga";
import { createTypeOrmConn } from "./utils/ormconn";
import { confirmEmail } from "./routes/confirmEmail";
import { redis } from "./redis";
import { genSchema } from "./utils/genSchema";
import { config } from "dotenv";
import * as session from "express-session";
import * as connectRedis from "connect-redis";

const RedisStore = connectRedis(session);
const SESSION_SECRET = "xxx";

export const startServer = async () => {
  config();
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: `${request.protocol}://${request.hostname}`,
      session: request.session
    })
  });

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: "sess:"
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const cors = {
    credentials: true,
    origin: process.env.FRONTEND_HOST as string
  };

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeOrmConn();
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log(`Server is running on localhost ${4000}`);

  return app;
};
