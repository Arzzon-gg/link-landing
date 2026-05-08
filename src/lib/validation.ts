import { z } from 'zod';
import { COUNTRY_CODES } from '@/data/countryCodes';

export const registrationSchema = z
  .object({
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

    // The dial code only, e.g. "1", "44", "961"
    countryCode: z
      .string()
      .min(1, 'Please select your country code'),

    // Local number digits only — no country code, no + sign
    phoneNumber: z
      .string()
      .trim()
      .min(1, 'Phone number is required')
      .regex(/^\d+$/, 'Phone number must contain digits only'),

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
  })
  .superRefine((data, ctx) => {
    const country = COUNTRY_CODES.find((c) => c.dial === data.countryCode);
    if (!country) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a valid country code',
        path: ['countryCode'],
      });
      return;
    }

    const digits = data.phoneNumber.replace(/\D/g, '');

    if (digits.length < country.min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${country.name} numbers must be at least ${country.min} digits`,
        path: ['phoneNumber'],
      });
    } else if (digits.length > country.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${country.name} numbers must be at most ${country.max} digits`,
        path: ['phoneNumber'],
      });
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
