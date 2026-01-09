import { a } from "@aws-amplify/backend";
import { uploadHandlerFunction } from "../../storage/resource";
import { sqsProcessorLambda } from "../../functions/resource";

export const migrationFileSchema = a
  .schema({
    MigrationStatus: a.enum(["READY", "IN_PROGRESS", "COMPLETED"]),
    FileType: a.enum(["MANAGERS", "CHEETIS", "CHEETI_PAATALU"]),
    MigrationFile: a
      .model({
        fileType: a.ref("FileType").required(),
        filename: a.string().required(),
        s3Url: a.string().required(),
        status: a.ref("MigrationStatus"),
        createdTime: a.timestamp(),
      })
      .secondaryIndexes((index) => [
        index("fileType").sortKeys(["createdTime"]),
      ]),
  })
  .authorization((allow) => [
    allow.authenticated(),
    allow.resource(uploadHandlerFunction).to(["mutate", "query"]),
    allow.resource(sqsProcessorLambda).to(["mutate", "query"]),
  ]);
