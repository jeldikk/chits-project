import {
  reqBasedClient,
  runWithAmplifyServerContext,
} from "@/utils/amplify.server";
import { cookies } from "next/headers";
import { Schema } from "@/data-schema";
import { NextResponse } from "next/server";

export async function GET() {
  const cheetilu = await runWithAmplifyServerContext({
    nextServerContext: { cookies },
    operation: async (contextSpec) => {
      // Fetch cheetilu data from the database
      const { data: cheetilu } =
        await reqBasedClient.models.Cheeti.list(contextSpec);
      return cheetilu;
    },
  });

  return NextResponse.json(
    {
      cheetilu,
    },
    {
      status: 200,
    }
  );
}
