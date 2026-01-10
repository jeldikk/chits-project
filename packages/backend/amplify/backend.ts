import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { uploadHandlerFunction, storage } from "./storage/resource";
import { sqsProcessorLambda, migrationPostLambda } from "./functions/resource";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Duration, Fn, Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  CognitoUserPoolsAuthorizer,
  Cors,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { getSuffixFromStack } from "./utils";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  storage,
  sqsProcessorLambda,
  uploadHandlerFunction,
  migrationPostLambda,
});

backend.uploadHandlerFunction.resources.cfnResources.cfnFunction.environment;

const sqsStack = backend.createStack("sqsStack");

const myQueue = new Queue(sqsStack, `${process.env.ENV}-sqs-stack`, {
  queueName: Fn.join("-", [
    `migration-${process.env.ENV}-sqs`,
    getSuffixFromStack(sqsStack),
  ]),
  visibilityTimeout: Duration.minutes(1),
});

backend.sqsProcessorLambda.resources.lambda.addEventSource(
  new SqsEventSource(myQueue, {
    batchSize: 10,
  })
);

myQueue.grantConsumeMessages(backend.sqsProcessorLambda.resources.lambda);
myQueue.grantSendMessages(backend.uploadHandlerFunction.resources.lambda);

const apiStack = backend.createStack("api-stack");

const restApi = new RestApi(apiStack, `migration-${process.env.ENV}-rest-api`, {
  restApiName: Fn.join("-", [
    `migration-${process.env.ENV}-sqs`,
    getSuffixFromStack(sqsStack),
  ]),
  description: "rest api for migration related activities",
  deploy: true,
  deployOptions: {
    stageName: process.env.ENV?.toLocaleLowerCase(),
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

const postLambdaIntegration = new LambdaIntegration(
  backend.migrationPostLambda.resources.lambda
);

const migrationFilesResource = restApi.root.addResource("migration-file", {
  defaultMethodOptions: {
    authorizationType: AuthorizationType.COGNITO,
  },
});

// add a proxy resource path to API - missing

// create a new Cognito User Pools authorizer
const cognitoAuth = new CognitoUserPoolsAuthorizer(
  apiStack,
  "ApiCognitoAuthorizer",
  {
    cognitoUserPools: [backend.auth.resources.userPool],
  }
);

migrationFilesResource.addMethod("POST", postLambdaIntegration, {
  authorizationType: AuthorizationType.COGNITO,
  authorizer: cognitoAuth,
});

const apiRestPolicy = new Policy(apiStack, "ApiStackPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:invoke"],
      resources: [
        `${restApi.arnForExecuteApi("POST", "/migration-file", "dev")}`,
      ],
    }),
  ],
});

backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(
  apiRestPolicy
);
// backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(
//   apiRestPolicy
// );

backend.addOutput({
  custom: {
    sqsQueuName: myQueue.queueName,
    sqsQueueUrl: myQueue.queueUrl,
    sqsQueueRef: myQueue.queueRef,
    sqsQueueArn: myQueue.queueArn,
    API: {
      [restApi.restApiName]: {
        endpoint: restApi.url,
        region: Stack.of(restApi).region,
        apiName: restApi.restApiName,
      },
    },
  },
});
