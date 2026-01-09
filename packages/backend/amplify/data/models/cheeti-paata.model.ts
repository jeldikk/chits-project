import { a } from "@aws-amplify/backend";

export const cheetiPaataSchema = a
  .schema({
    CheetiPaata: a.model({
      amount: a.float(),
      date: a.string(),
      isOwned: a.boolean(),
      cheetiId: a.id(),
      cheeti: a.belongsTo("Cheeti", "cheetiId"),
    }),
  })
  .authorization((allow) => [allow.authenticated()]);
