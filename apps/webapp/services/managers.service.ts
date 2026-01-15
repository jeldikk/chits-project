import { cookieBasedClient } from "@/utils/amplify.server";

export async function fetchManagers() {
  cookieBasedClient.models.Manager.list({
    filter: {
      ownerId: {
        eq: "Kamal",
      },
    },
  });
  return [
    {
      name: "John Doe",
    },
    {
      name: "Michael",
    },
    {
      name: "Adam",
    },
  ];
}

export async function createManager() {}
