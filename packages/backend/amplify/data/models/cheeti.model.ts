import { a } from "@aws-amplify/backend";

export const cheetiSchema = a
  .schema({
    Month: a.customType({
      month: a.integer(),
      year: a.integer(),
    }),
    CheetiStatus: a.enum(["READY", "IN_PROGRESS", "COMPLETED"]),
    Cheeti: a.model({
      manager: a.customType({
        name: a.string().required(),
        address: a.string(),
      }),
      name: a.string().required(),
      value: a.float().required(),
      subscriptionAmount: a.float().required(),
      tenure: a.integer().required(),
      startDetails: a.ref("Month"),
      endDetails: a.ref("Month"),
      paataDate: a.integer(),
      managerPaata: a.integer().required(),
      memberCount: a.integer().required(),
      status: a.ref("CheetiStatus").required(),
      ownerId: a.string().required(),
      cheetiPaatalu: a.hasMany("CheetiPaata", "cheetiId"),
    }),
  })
  .authorization((allow) => [allow.authenticated()]);
