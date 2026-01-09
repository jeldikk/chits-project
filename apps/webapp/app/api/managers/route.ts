import { NextRequest, NextResponse } from "next/server";
import {
  cookieBasedClient,
  reqBasedClient,
  runWithAmplifyServerContext,
} from "@/utils/amplify.server";
import { getCurrentUser } from "aws-amplify/auth/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const managers = await runWithAmplifyServerContext({
    nextServerContext: { request: req, response: res },
    operation: async (contextSpec) => {
      const user = await getCurrentUser(contextSpec);
      const userId = user.userId;
      const managers = await reqBasedClient.models.Manager.list(contextSpec, {
        filter: {
          authorId: {
            eq: userId,
          },
        },
      });
      return managers;
    },
  });

  return NextResponse.json(managers);
}
