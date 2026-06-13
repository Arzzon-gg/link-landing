import { z } from 'zod';
import { COUNTRY_CODES } from '@/data/countryCodes';
import { getAgeFromDateOfBirth } from '@/lib/validation';

const optionalTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value ?? '');

export const accountProfileCompletionSchema = z
  .object({
    countryCode: z.string().trim().min(1, 'Please select a country code'),
    phoneNumber: optionalTrimmedString,
    dateOfBirth: optionalTrimmedString,
    married: z.enum(['yes', 'no']).optional(),
    marriageDate: optionalTrimmedString,
    address: optionalTrimmedString,
  })
  .superRefine((data, ctx) => {
    if (!data.phoneNumber) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number is required',
        path: ['phoneNumber'],
      });
    } else {
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

    if (!data.address || data.address.length < 10) {
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

export type AccountProfileCompletionInput = z.infer<typeof accountProfileCompletionSchema>;
