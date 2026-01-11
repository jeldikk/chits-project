import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { cookies } from "next/headers";
import config from "../amplify_outputs.json";
import {
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth/server";
import {
  generateServerClientUsingCookies,
  generateServerClientUsingReqRes,
} from "@aws-amplify/adapter-nextjs/data";
import { Schema } from "@/data-schema";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});

export const reqBasedClient = generateServerClientUsingReqRes<Schema>({
  config,
});

export async function getAuthUserDetails() {
  try {
    const authUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        const user = await getCurrentUser(contextSpec);
        const session = await fetchAuthSession(contextSpec);
        const attributes = await fetchUserAttributes(contextSpec);
        const cognitoGroups = session.tokens?.accessToken.payload[
          "cognito:groups"
        ]! as string;
        const isAdmin = cognitoGroups && cognitoGroups.includes("ADMIN");
        return {
          isAdmin: Boolean(isAdmin),
          user,
        };
      },
    });
    return {
      isAdmin: authUser.isAdmin,
      authUser: authUser.user,
    };
  } catch (err) {
    return {
      isAdmin: false,
      authUser: null,
    };
  }
}
