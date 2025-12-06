import { a } from "@aws-amplify/backend";

export const cheetiModel = a
  .model({
    name: a.string().required(),
    value: a.float().required(),
    subscriptionAmount: a.float().required(),
    tenure: a.integer().required(),
    startMonth: a.ref("Month"),
    endMonth: a.ref("Month"),
    paataDate: a.date(),
    managerPaata: a.integer().required(),
    memberCount: a.integer().required(),
    status: a.ref("CheetiStatus").required(),
    cheetiPaatalu: a.hasMany("CheetiPaata", "cheetiId"),
  })
  .authorization((allow) => [allow.authenticated()]);
