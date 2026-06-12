import { z } from 'zod';

export const accountLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  password: z
    .string()
    .min(1, 'Password is required')
    .max(72, 'Password is too long'),
});

export type AccountLoginInput = z.infer<typeof accountLoginSchema>;
