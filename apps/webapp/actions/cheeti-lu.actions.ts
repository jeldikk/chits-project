"use server";

import { createPayloadSchema } from "@/schemas/cheeti-lu.schema";
import { cookieBasedClient } from "@/utils/amplify.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
};

export async function createCheetiAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log({ prevState });
  console.dir({ formData }, { depth: null });
  const rawFormData = {
    ownerId: formData.get("ownerId"),
    managerId: formData.get("managerId"),
    name: formData.get("name"),
    value: Number(formData.get("value")),
    tenure: Number(formData.get("tenure")),
    subscriptionAmount: Number(formData.get("subscriptionAmount")),
    startDetails: {
      month: Number(formData.get("startDetails.month")),
      year: Number(formData.get("startDetails.year")),
    },
    endDetails: {
      month: Number(formData.get("endDetails.month")),
      year: Number(formData.get("endDetails.year")),
    },
    paataDate: Number(formData.get("paataDate")),
    managerPaata: Number(formData.get("managerPaata")),
    memberCount: Number(formData.get("memberCount")),
    // status: formData.get("status"),
  };
  console.log({ rawFormData });
  const validationResult = createPayloadSchema.safeParse(rawFormData);
  console.log(JSON.stringify(validationResult, null, 2));

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // validation is successful
  const {
    ownerId,
    managerId,
    name,
    value,
    subscriptionAmount,
    tenure,
    startDetails,
    endDetails,
    paataDate,
    managerPaata,
    memberCount,
  } = validationResult.data;

  const cheetiPaata = await cookieBasedClient.models.Cheeti.create({
    ownerId,
    managerId,
    name,
    value,
    subscriptionAmount,
    tenure,
    startDetails: {
      month: startDetails.month,
      year: startDetails.year,
    },
    endDetails: {
      month: endDetails.month,
      year: endDetails.year,
    },
    paataDate,
    managerPaata,
    memberCount,
    status: "READY",
  });
  console.dir({ cheetiPaata }, { depth: null });

  revalidatePath("/cheetilu");

  redirect("/cheetilu");
}
