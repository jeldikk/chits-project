import { config } from "../config";
import { defineStorage, defineFunction } from "@aws-amplify/backend";

export const uploadHandlerFunction = defineFunction({
  name: "storage-on-upload-handler",
  entry: "./triggers/on-upload-handler.ts",
  environment: {
    SQS_QUEUE_URL: process.env.SQS_QUEUE_URL as string,
  },
});

export const storage = defineStorage({
  name: "chits-storage",
  access: (allow) => ({
    "migration/managers/*": [
      // allow.groups(["ADMIN"]).to(["get", "list", "write", "delete"]),
      // allow.authenticated.to(["read"]),
      allow.groups(["ADMIN"]).to(["get", "list", "write", "delete"]),
      allow.resource(uploadHandlerFunction).to(["read"]),
    ],
    "migration/cheetis/{timestamp}/*": [
      allow.groups(["ADMIN"]).to(["get", "list", "write", "delete"]),
    ],
    "migration/cheeti-paatas/{timestamp}/*": [
      allow.groups(["ADMIN"]).to(["get", "list", "write", "delete"]),
    ],
  }),
  triggers: {
    onUpload: uploadHandlerFunction,
  },
});
