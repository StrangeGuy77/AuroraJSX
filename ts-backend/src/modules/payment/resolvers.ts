import { ResolverMap } from "../../types/graphql-utils";
import { GQL } from "../../types/schema";
// import { Payment } from "../../entity/Payment";
import * as Errors from "./errorMsgs";

const errorResponse = (path: string) => [
  {
    path,
    message: Errors.invalidPayment
  }
];

export const resolvers: ResolverMap = {
  Query: {
    _: () => ""
  },
  Mutation: {
    payment_registration: async (
      _: any,
      params: GQL.IMutation,
      { session }
    ) => {
      // stripe validation
      // Payment.create()
      return [params, session, errorResponse];
    }
  }
};
