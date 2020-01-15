import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/graphql";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`
  }
};
