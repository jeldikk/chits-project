import { z } from "zod";
import { differenceInMonths } from "date-fns";

const monthDetailsSchema = z.object({
  month: z.number().refine((val) => val >= 1 && val <= 12, {
    message: "Month can only be 1 to 12",
    path: ["month"],
  }),
  year: z.number().refine((val) => val >= 2020 && val <= 2035, {
    message: "Currently we are supporting only upto 2035",
    path: ["year"],
  }),
});

export const createPayloadSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Cheeti Name should be alteast 3 chars length",
      })
      .max(20, {
        message: "Maximum 20 characters are allowed",
      }),
    value: z.number(),
    tenure: z.number(),
    subscriptionAmount: z.number(),
    startDetails: monthDetailsSchema,
    endDetails: monthDetailsSchema,
    paataDate: z.number(),
    managerPaata: z.number(),
    memberCount: z.number(),
    manager: z.object({
      name: z.string(),
      address: z.string(),
    }),
    ownerId: z.string(),
  })
  .superRefine((data, ctx) => {
    // subscription Amount should be equal to cheetiValue/tenure
    if (data.subscriptionAmount !== data.value / data.tenure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tenure Amount mismatch found",
        path: ["misc"],
      });
    }
    // tenure should be equal to memberCount
    if (data.tenure !== data.memberCount) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tenure and Member Count should be equal",
        path: ["misc"],
      });
    }

    // manager paata should be less than tenure
    if (data.managerPaata > data.tenure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Manager Paata should be less than number of tenure months",
        path: ["misc"],
      });
    }

    // difference between startDetails and endDetails should equal to tenure
    const fromDate = new Date(
      data.startDetails.year,
      data.startDetails.month - 1,
      data.paataDate
    );
    const endDate = new Date(
      data.endDetails.year,
      data.endDetails.month - 1,
      data.paataDate
    );

    const calcMonths = differenceInMonths(endDate, fromDate);
    if (calcMonths !== data.tenure) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Difference between start and end details should match with tenure",
        path: ["misc"],
      });
    }
  });
