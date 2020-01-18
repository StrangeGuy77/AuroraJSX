import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import * as path from "path";
import { genSchema } from "../utils/genSchema";

fs.writeFileSync(
  path.join(__dirname, "../types/schema.d.ts"),
  generateNamespace("GQL", genSchema())
);
