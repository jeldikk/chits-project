import {
  cookieBasedClient,
  runWithAmplifyServerContext,
} from "@/utils/amplify.server";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export async function fetchCheetilu() {
  const cheetilu = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      const currentUser = await getCurrentUser(contextSpec);
      const response = await cookieBasedClient.models.Cheeti.list({
        filter: {
          ownerId: {
            eq: currentUser.userId,
          },
        },
        // selectionSet: ["id", "name", "value", "status"],
      });
      return response.data;
    },
  });

  return cheetilu;
}
