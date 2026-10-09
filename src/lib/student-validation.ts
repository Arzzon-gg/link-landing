import { z } from 'zod';

export const studentFields = {
  isStudent: z.boolean().default(false),
  universityId: z.string().trim().nullish().transform((value) => value || null),
  studentId: z.string().trim().nullish().transform((value) => value || null),
};

export type StudentDetails = {
  isStudent: boolean;
  universityId: string | null;
  studentId: string | null;
};

export function validateStudentDetails(data: StudentDetails, ctx: z.RefinementCtx) {
  if (!data.isStudent) return;
  if (!data.universityId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['universityId'], message: 'Please select your university' });
  }
  if (data.studentId && data.studentId.length > 100) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['studentId'], message: 'Student ID must be at most 100 characters' });
  }
}

export function normalizeStudentDetails<T extends StudentDetails>(data: T): T {
  return data.isStudent ? data : { ...data, universityId: null, studentId: null };
}

// PATCH must retain the difference between omitted, null (keep), and "" (clear).
export const studentPatchSchema = z.object({
  isStudent: z.boolean().nullish(),
  universityId: z.string().trim().nullish(),
  studentId: z.string().trim().nullish(),
}).superRefine((data, ctx) => {
  if (data.isStudent === false) return;
  if (data.universityId === '') {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['universityId'], message: 'Please select your university' });
  }
  if (data.studentId && data.studentId.length > 100) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['studentId'], message: 'Student ID must be at most 100 characters' });
  }
}).transform((data) => data.isStudent === false
  ? { ...data, universityId: null, studentId: null }
  : data);

export const universitiesSchema = z.array(z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
}));

export type University = z.infer<typeof universitiesSchema>[number];
