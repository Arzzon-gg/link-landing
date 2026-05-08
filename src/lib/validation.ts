import { z } from 'zod';

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[\p{L}\s'\-]+$/u, 'Name contains invalid characters'),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),

  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required')
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      'Please enter a valid phone number (e.g. +1 555 000 0000)'
    ),

  address: z
    .string()
    .trim()
    .min(10, 'Please enter your full address (at least 10 characters)')
    .max(300, 'Address is too long'),

  // z.coerce handles the string-to-number cast from the HTML input
  age: z.coerce
    .number({ invalid_type_error: 'Age must be a number' })
    .int('Age must be a whole number')
    .min(13, 'You must be at least 13 years old to register')
    .max(120, 'Please enter a valid age'),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
