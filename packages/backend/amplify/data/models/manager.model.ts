import { a } from "@aws-amplify/backend";

export const managerModel = a
  .model({
    name: a.string(),
    address: a.string(),
  })
  .authorization((allow) => [allow.authenticated()]);
