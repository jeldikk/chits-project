import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { cookies } from "next/headers";
import config from "../amplify_outputs.json";
import {
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config,
});

export async function getAuthUserDetails() {
  try {
    const authUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        // console.log(contextSpec);
        const user = await getCurrentUser(contextSpec);
        const session = await fetchAuthSession(contextSpec);
        const attributes = await fetchUserAttributes(contextSpec);
        // console.log({ user, session, attributes });
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
    // console.log({ authUser });
    return {
      isAdmin: authUser.isAdmin,
      authUser: authUser.user,
    };
  } catch (err) {
    console.log("Error in getting auth user details", err);
    return {
      isAdmin: false,
      authUser: null,
    };
  }
}
