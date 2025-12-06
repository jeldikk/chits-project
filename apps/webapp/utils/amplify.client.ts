import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/data-schema";

export const dataClient = generateClient<Schema>({
  authMode: "userPool",
});
