import { defineFunction } from "@aws-amplify/backend";

export const sqsProcessorLambda = defineFunction({
  name: "chiti-migration-sqs-processor",
  entry: "./sqs-processor/handler.ts",
});

export const migrationPostLambda = defineFunction({
  name: "migration-post-lambda",
  entry: "./migration-api-functions/post-handler.ts",
});
