import { z } from "zod";

export const profileInfoSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Please use at least 3 characters" })
    .max(50, { message: "Keep your response within 50 characters" }),
  age: z
    .number({
      invalid_type_error: "Please enter valid age",
    })
    .min(12, { message: "Age should be greater than or equal to 12" })
    .nonnegative({ message: "Age cannot be a negative number" })
    .or(z.literal("")),
  gender: z.string(),
});

export type ProfileInfoSchema = z.infer<typeof profileInfoSchema>;
