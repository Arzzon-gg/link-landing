import { google } from 'googleapis';

// The tab name inside your Google Sheet where rows will be appended.
// Create this tab manually and add the header row shown below.
//
// Column order: Submission ID | Created At | Name | Email | Phone | Address | Age
const SHEET_TAB = 'Registrations';

// Column range — G covers all 7 columns (A through G)
const SHEET_RANGE = `${SHEET_TAB}!A:G`;

function buildAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!email || !rawKey) {
    throw new Error(
      'Google Sheets credentials are not configured. ' +
        'Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY in your environment.'
    );
  }

  // Environment variables store \n as a literal two-character sequence.
  // Replace them so the PEM key is parsed correctly by the Google auth library.
  const privateKey = rawKey.replace(/\\n/g, '\n');

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function appendRegistration(row: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error(
      'GOOGLE_SHEET_ID is not configured in environment variables.'
    );
  }

  const auth = buildAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}
