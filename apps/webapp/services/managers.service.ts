import { cookieBasedClient } from "@/utils/amplify.server";
import { delay } from "@/utils/delay";

export async function fetchManagers() {
  cookieBasedClient.models.Manager.list({
    filter: {
      authorId: {
        eq: "Kamal",
      },
    },
  });
  await delay(5000);
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
