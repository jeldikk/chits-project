"use server";

import { cookieBasedClient } from "@/utils/amplify.server";
import { createPayloadSchema as managerPayloadSchema } from "../schemas/managers.schema";
import { z } from "zod";
import { Schema } from "@/data-schema";

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]> | null;
}

export async function createManagerAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    name: formData.get("name") as string,
    address: formData.get("address") as string,
    authorId: formData.get("authorId") as string,
  };
  const validationResult = managerPayloadSchema.safeParse(rawFormData);
  console.dir(
    {
      issues: validationResult.error?.issues,
      flatten: validationResult.error?.flatten(),
    },
    { depth: null }
  );
  if (!validationResult.success) {
    const errorMap = {};
    // validationResult.error?.errors.map((err) => {});
    return {
      success: false,
      message: "Manager creation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  console.log({
    rawFormData,
    prevState,
  });
  //   const validation = createPayloadSchema.parse(rawFormData);
  //   console.log({ validation });
  //   console.log(rawFormData);
  //   await delay(5000);
  const manager = await cookieBasedClient.models.Manager.create({
    name: rawFormData.name,
    address: rawFormData.address,
    authorId: rawFormData.authorId,
  });
  console.dir({ manager }, { depth: null });
  return {
    success: true,
    message: "Manager has been created",
    errors: null,
  };
}
