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
    ownerId: formData.get("ownerId") as string,
  };
  const validationResult = managerPayloadSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    const errorMap = {};
    // validationResult.error?.errors.map((err) => {});
    return {
      success: false,
      message: "Manager creation failed",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const manager = await cookieBasedClient.models.Manager.create({
    name: rawFormData.name,
    address: rawFormData.address,
    ownerId: rawFormData.ownerId,
  });
  return {
    success: true,
    message: "Manager has been created",
    errors: null,
  };
}
