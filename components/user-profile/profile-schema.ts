import { z } from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Please use at least 3 characters' })
    .max(50, { message: 'Keep your response within 50 characters' })
    .optional(),
  certificateName: z
    .string()
    .min(3, { message: 'Please use at least 3 characters' })
    .max(50, { message: 'Keep your response within 50 characters' })
    .optional()
    .or(z.literal(''))
    .transform(e => (e === '' ? undefined : e)),
  phone: z
    .string()
    .min(11, {
      message: 'Phone number must have 11 digits for BD number',
    })
    .max(11, {
      message: 'Phone number must have 11 digits for BD number',
    })

    .refine(
      value => /^(?:01[3-9]\d{8})$/.test(value),
      'Phone number must be a valid BD number',
    )
    .optional(),
  designation: z
    .string()
    .min(3, { message: 'Please use at least 3 characters' })
    .max(50, { message: 'Keep your response within 50 characters' })
    .optional()
    .or(z.literal(''))
    .transform(e => (e === '' ? undefined : e)),
  age: z
    .number({
      invalid_type_error: 'Please enter valid age',
    })
    .min(12, { message: 'Age should be greater than or equal to 12' })
    .nonnegative({ message: 'Age cannot be a negative number' })
    .or(z.literal(''))
    .transform(e => (e === '' ? undefined : e)),
  gender: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(e => (e === '' ? undefined : e)),
  picture: z.string().optional().or(z.literal('')),
});

export type ProfileSchema = z.infer<typeof profileSchema>;