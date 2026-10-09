import { google } from 'googleapis';
import type { StudentDetails } from '@/lib/student-validation';

// A–J: Submission ID | Created At | Name | Email | Phone | Address | DateOfBirth | Married | AnniversaryDate | Note
// K–M: Is Student | University ID | Student ID (only on compatible sheets).
// Defaults to 'Sheet1' (the Google Sheets default tab name).
// Override by setting GOOGLE_SHEET_TAB in your environment.
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB ?? 'Sheet1';
const SHEET_RANGE = `${SHEET_TAB}!A:J`;
const STUDENT_HEADERS = ['Is Student', 'University ID', 'Student ID'];

function buildCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      'Google Sheets credentials are not configured. ' +
        'Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your environment.'
    );
  }

  // 1. Strip any surrounding quotes that some env loaders leave in place.
  // 2. Convert literal \n sequences to real newlines (handles both dotenv modes:
  //    expanded double-quoted values and unexpanded single-quoted / unquoted values).
  const privateKey = rawKey
    .replace(/^["']|["']$/g, '')
    .replace(/\\n/g, '\n');

  return { email, privateKey };
}

// Shared helper — builds an authenticated Sheets client.
function buildSheetsClient(sheetId: string) {
  const { email, privateKey } = buildCredentials();

  const auth = new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: privateKey },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return { sheets: google.sheets({ version: 'v4', auth }), sheetId };
}

export type DuplicateField = 'email' | 'phone';

/**
 * Reads all existing rows and checks whether the given email or phone
 * already appears in the sheet. Returns which field is duplicated, or
 * null if the registration is new.
 *
 * Column indices (0-based): 0=SubmissionID, 1=CreatedAt, 2=Name,
 *   3=Email, 4=Phone, 5=Address, 6=DateOfBirth, 7=Married, 8=AnniversaryDate
 */
export async function checkDuplicate(
  email: string,
  phone: string
): Promise<DuplicateField | null> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error('GOOGLE_SHEET_ID is not configured.');

  const { sheets, sheetId: id } = buildSheetsClient(sheetId);

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: SHEET_RANGE,
  });

  const rows = res.data.values ?? [];

  // Skip header row if present (row[0] would be 'Submission ID' or similar)
  const dataRows = rows[0]?.[3]?.toLowerCase() === 'email' ? rows.slice(1) : rows;

  const emailNorm = email.toLowerCase().trim();
  // Strip every non-digit character so formatting differences like
  // "+1 555-123-4567" vs "+1(555)123 4567" still match.
  const phoneNorm = phone.replace(/\D/g, '');

  for (const row of dataRows) {
    if ((row[3] ?? '').toLowerCase().trim() === emailNorm) return 'email';
    if ((row[4] ?? '').replace(/\D/g, '') === phoneNorm) return 'phone';
  }

  return null;
}

export async function appendRegistration(row: string[], studentDetails?: StudentDetails): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error(
      'GOOGLE_SHEET_ID is not configured in environment variables.'
    );
  }

  const { sheets, sheetId: id } = buildSheetsClient(sheetId);

  let values = row;
  if (studentDetails) {
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: id,
      range: `${SHEET_TAB}!A:M`,
    });
    const rows = existing.data.values ?? [];
    const header = rows[0] ?? [];
    const hasStudentHeaders = STUDENT_HEADERS.every((name, index) => header[index + 10] === name);
    const canAddStudentHeaders = header[3]?.toLowerCase() === 'email'
      && rows.every((item) => item.slice(10, 13).every((value) => value === '' || value == null));

    if (hasStudentHeaders || canAddStudentHeaders) {
      if (!hasStudentHeaders) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: id,
          range: `${SHEET_TAB}!K1:M1`,
          valueInputOption: 'RAW',
          requestBody: { values: [STUDENT_HEADERS] },
        });
      }
      // USER_ENTERED remains compatible with the original columns. Prefix IDs
      // as literal text so leading zeros survive and formulas cannot execute.
      values = [...row, studentDetails.isStudent ? 'Yes' : 'No',
        studentDetails.universityId ? `'${studentDetails.universityId}` : '',
        studentDetails.studentId ? `'${studentDetails.studentId}` : ''];
    } else {
      console.warn('[sheets] Student columns skipped: existing sheet layout is not compatible.');
    }
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: values.length > 10 ? `${SHEET_TAB}!A:M` : SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [values] },
  });
}
