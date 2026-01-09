import { a } from "@aws-amplify/backend";

export const managerSchema = a
  .schema({
    Manager: a.model({
      name: a.string().required(),
      address: a.string(),
      ownerId: a.string().required(),
    }),
  })
  .authorization((allow) => [
    allow.authenticated(),
    allow.ownerDefinedIn("ownerId").to(["read"]),
  ]);
