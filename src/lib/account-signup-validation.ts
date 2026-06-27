import { z } from 'zod';
import { COUNTRY_CODES } from '@/data/countryCodes';
import { getAgeFromDateOfBirth } from '@/lib/validation';

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value ?? '');

export const accountSignupSchema = z
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

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(72, 'Password is too long'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    countryCode: z.string().trim().min(1, 'Please select a country code'),

    phoneNumber: optionalTrimmedString,

    dateOfBirth: optionalTrimmedString,

    married: z.enum(['yes', 'no']).optional(),

    marriageDate: optionalTrimmedString,

    address: optionalTrimmedString,

    // Optional free-text note. No content requirement; just length-capped.
    note: z
      .string()
      .trim()
      .max(1000, 'Note is too long')
      .optional()
      .transform((value) => value ?? ''),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }

    if (!data.phoneNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number is required',
        path: ['phoneNumber'],
      });
    }

    if (!data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Address is required',
        path: ['address'],
      });
    } else if (data.address.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter your full address (at least 10 characters)',
        path: ['address'],
      });
    } else if (data.address.length > 300) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Address is too long',
        path: ['address'],
      });
    }

    if (data.phoneNumber) {
      const country = COUNTRY_CODES.find((item) => item.dial === data.countryCode);

      if (!country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please select a valid country code',
          path: ['countryCode'],
        });
      } else {
        const digits = data.phoneNumber.replace(/\D/g, '');

        if (!digits) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Phone number must contain digits only',
            path: ['phoneNumber'],
          });
        } else if (digits.length < country.min) {
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
      }
    }

    if (!data.dateOfBirth) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Date of birth is required',
        path: ['dateOfBirth'],
      });
      return;
    }

    const age = getAgeFromDateOfBirth(data.dateOfBirth);

    if (age === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a valid date',
        path: ['dateOfBirth'],
      });
      return;
    }

    if (age < 13) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You must be at least 13 years old to create an account',
        path: ['dateOfBirth'],
      });
      return;
    }

    if (age > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a valid date of birth',
        path: ['dateOfBirth'],
      });
      return;
    }

    if (age >= 18 && !data.married) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select whether you are married',
        path: ['married'],
      });
      return;
    }

    if (age < 18 && data.married === 'yes') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only users aged 18 or older can be marked as married',
        path: ['married'],
      });
    }

    if (data.married === 'yes') {
      if (!data.marriageDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Marriage date is required when you are married',
          path: ['marriageDate'],
        });
        return;
      }

      const marriageDate = new Date(`${data.marriageDate}T00:00:00.000Z`);
      const dateOfBirth = new Date(`${data.dateOfBirth}T00:00:00.000Z`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (Number.isNaN(marriageDate.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid date',
          path: ['marriageDate'],
        });
        return;
      }

      if (marriageDate > today) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Marriage date cannot be in the future',
          path: ['marriageDate'],
        });
      }

      if (marriageDate < dateOfBirth) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Marriage date cannot be before date of birth',
          path: ['marriageDate'],
        });
      }
    }

    if (data.married === 'no' && data.marriageDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Marriage date must be empty when you are not married',
        path: ['marriageDate'],
      });
    }
  });

export type AccountSignupInput = z.infer<typeof accountSignupSchema>;
