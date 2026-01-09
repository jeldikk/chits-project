import { z } from "zod";

export const createPayloadSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Field is required with atleast 3 characters" }),
  address: z
    .string()
    .min(10, { message: "Field is required with atleast 10 characters" }),
  authorId: z.string(),
});
