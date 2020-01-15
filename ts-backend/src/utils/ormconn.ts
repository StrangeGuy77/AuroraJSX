import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeOrmConn = async () => {
  const connOpts = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connOpts, name: "default" });
};
