import { google } from 'googleapis';

// Column order: Submission ID | Created At | Name | Email | Phone | Address | Age
// Defaults to 'Sheet1' (the Google Sheets default tab name).
// Override by setting GOOGLE_SHEET_TAB in your environment.
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB ?? 'Sheet1';
const SHEET_RANGE = `${SHEET_TAB}!A:G`;

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

export async function appendRegistration(row: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    throw new Error(
      'GOOGLE_SHEET_ID is not configured in environment variables.'
    );
  }

  const { email, privateKey } = buildCredentials();

  // GoogleAuth with a credentials object is the recommended approach for
  // service accounts loaded from environment variables. It avoids the OpenSSL
  // DECODER routines::unsupported error that google.auth.JWT can trigger on
  // Node.js 18+ / OpenSSL 3.
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}
