import { z } from 'zod';
import { COUNTRY_CODES } from '@/data/countryCodes';

export function getAgeFromDateOfBirth(dateOfBirth?: string | null): number | null {
  if (!dateOfBirth) return null;

  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;

  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

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

    // Date of birth as an ISO date string (YYYY-MM-DD)
    dateOfBirth: z.string().min(1, 'Date of birth is required'),

    // Marital status is required for applicants over 19.
    married: z.enum(['yes', 'no']).optional(),

    // Anniversary date is required only when the applicant is married.
    anniversaryDate: z.string().optional(),
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

    // Validate dateOfBirth: must be a valid date and age between 13 and 120
    const age = getAgeFromDateOfBirth(data.dateOfBirth);

    if (age === null) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter a valid date', path: ['dateOfBirth'] });
      return;
    }

    if (age < 13) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'You must be at least 13 years old to register', path: ['dateOfBirth'] });
      return;
    }

    if (age > 120) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Please enter a valid date of birth', path: ['dateOfBirth'] });
      return;
    }

    if (age > 19) {
      if (!data.married) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select whether you are married',
          path: ['married'],
        });
        return;
      }

      if (data.married === 'yes') {
        if (!data.anniversaryDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter your anniversary date',
            path: ['anniversaryDate'],
          });
          return;
        }

        const anniversary = new Date(data.anniversaryDate);
        if (Number.isNaN(anniversary.getTime())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid date',
            path: ['anniversaryDate'],
          });
        }
      }
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
