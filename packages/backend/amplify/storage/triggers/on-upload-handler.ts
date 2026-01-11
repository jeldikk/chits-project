import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import type { S3Event, S3Handler } from "aws-lambda";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import type { Schema } from "../../data/resource";
import { env } from "$amplify/env/storage-on-upload-handler";

const { libraryOptions, resourceConfig } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();
const sqsClient = new SQSClient();

export const handler: S3Handler = async (s3Event: S3Event) => {
  const objectKeys = s3Event.Records.map((record) => {
    return record.s3.object.key;
  });

  const command = new SendMessageCommand({
    QueueUrl: env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify({
      fileType: "managers",
      s3FileLink: "link-to-file-created-in-s3",
      metadata: { name: "kamal", age: 33 },
    }),
  });

  await sqsClient.send(command);

  // we have to push data to SQS queue
};
