import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("I am calling from middleware");
  console.dir({
    url: req.url,
  });
}

export const config = {
  matcher: ["/auth/login", "/", "/managers", "/cheeti"],
};
