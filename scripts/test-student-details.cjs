const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const path = require('node:path');
const { runInThisContext } = require('node:vm');
const { test } = require('node:test');
const ts = require('typescript');

// Load the actual TypeScript modules with the project's alias, without adding
// a test-runner dependency or emitting files into the application.
function createLoader(mocks = {}) {
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const source = ts.transpileModule(readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const localRequire = (name) => {
      if (Object.hasOwn(mocks, name)) return mocks[name];
      if (name.startsWith('@/')) {
        const basePath = path.resolve(__dirname, '../src', name.slice(2));
        return load(existsSync(`${basePath}.ts`) ? `${basePath}.ts` : `${basePath}.tsx`);
      }
      return require(name);
    };
    runInThisContext(`(function(require, module, exports) {${source}\n})`, { filename: file })(localRequire, module, module.exports);
    return module.exports;
  }
  return (file) => load(path.resolve(__dirname, '../src', file));
}

const load = createLoader();
const signup = load('lib/account-signup-validation.ts').accountSignupSchema;
const profile = load('lib/account-profile-validation.ts').accountProfileCompletionSchema;
const { accountProfilePatchSchema: profilePatch, buildProfileCompletionRequest } = load('lib/account-profile-validation.ts');
const base = {
  name: 'Alex Johnson', email: 'alex@example.com', password: 'secure123', confirmPassword: 'secure123',
  countryCode: '961', phoneNumber: '71123456', dateOfBirth: '2000-01-01', address: '', note: '',
};

for (const [name, schema] of [['signup', signup], ['profile', profile]]) {
  test(`${name}: legacy requests default to non-student`, () => {
    const result = schema.parse(base);
    assert.equal(result.isStudent, false);
    assert.equal(result.universityId, null);
    assert.equal(result.studentId, null);
  });
  test(`${name}: students require a university`, () => {
    const result = schema.safeParse({ ...base, isStudent: true, universityId: '  ' });
    assert.equal(result.success, false);
    assert.ok(result.error.flatten().fieldErrors.universityId);
  });
  test(`${name}: optional student ID is trimmed and capped at 100`, () => {
    assert.equal(schema.parse({ ...base, isStudent: true, universityId: ' uni-1 ' }).studentId, null);
    const result = schema.parse({ ...base, isStudent: true, universityId: ' uni-1 ', studentId: ` ${'0'.repeat(100)} ` });
    assert.equal(result.universityId, 'uni-1');
    assert.equal(result.studentId.length, 100);
    assert.equal(schema.safeParse({ ...base, isStudent: true, universityId: 'uni-1', studentId: 'a'.repeat(101) }).success, false);
  });
  test(`${name}: non-students clear stale university and student IDs`, () => {
    const result = schema.parse({ ...base, isStudent: false, universityId: 'uni-1', studentId: 'a'.repeat(101) });
    assert.equal(result.universityId, null);
    assert.equal(result.studentId, null);
  });
}

test('PATCH student validation preserves omitted, null, and explicit empty values', () => {
  const omitted = profilePatch.parse(base);
  for (const field of ['isStudent', 'universityId', 'studentId']) {
    assert.equal(Object.hasOwn(omitted, field), false);
  }
  const nullable = profilePatch.parse({ ...base, isStudent: true, universityId: null, studentId: null });
  assert.equal(nullable.isStudent, true);
  assert.equal(nullable.universityId, null);
  assert.equal(nullable.studentId, null);
  assert.equal(profilePatch.parse({ ...base, isStudent: null }).isStudent, null);
  const clear = profilePatch.parse({ ...base, studentId: '   ' });
  assert.equal(clear.isStudent, undefined);
  assert.equal(clear.studentId, '');
  assert.equal(profilePatch.safeParse({ ...base, universityId: '' }).success, false);
  assert.equal(profilePatch.safeParse({ ...base, studentId: 'a'.repeat(101) }).success, false);
  assert.deepEqual(profilePatch.parse({ ...base, isStudent: false, universityId: 'aub', studentId: 'old' }), {
    ...profilePatch.parse(base), isStudent: false, universityId: null, studentId: null,
  });
});

test('full completion form explicitly sends empty student ID for clearing', () => {
  for (const studentId of [undefined, null, '', '   ']) {
    const data = profile.parse({ ...base, isStudent: true, universityId: 'aub', studentId });
    const request = buildProfileCompletionRequest(data);
    assert.equal(request.isStudent, true);
    assert.equal(request.universityId, 'aub');
    assert.equal(request.studentId, '');
    assert.equal(profilePatch.parse(request).studentId, '');
  }
  const nonStudent = buildProfileCompletionRequest(profile.parse(base));
  assert.equal(nonStudent.isStudent, false);
  assert.equal(nonStudent.studentId, null);
});

test('completion PATCH proxy preserves partial/null student details and forwards explicit clears', async () => {
  const originalFetch = global.fetch;
  const originalUrl = process.env.CLOUDHUB_API_URL;
  process.env.CLOUDHUB_API_URL = 'https://backend.example';
  let forwarded;
  const routeLoader = createLoader({
    '@/lib/account-session': { getCurrentAccountSession: async () => ({ userId: 1, isStudent: true, universityId: 'aub', studentId: '001' }) },
    '@/lib/rate-limit': { checkRateLimit: () => ({ allowed: true }) },
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'test-token' }) }) },
  });
  try {
    global.fetch = async (_url, options) => {
      forwarded = JSON.parse(options.body);
      return Response.json({ id: 1, profileCompleted: true, isStudent: true, universityId: 'aub', studentId: '001' });
    };
    const { PATCH } = routeLoader('app/api/account-complete-profile/route.ts');
    const send = async (data) => {
      const response = await PATCH(new Request('https://landing.example/api/account-complete-profile', {
        method: 'PATCH', body: JSON.stringify({ ...base, ...data }),
      }));
      assert.equal(response.status, 200);
    };
    await send({});
    for (const field of ['isStudent', 'universityId', 'studentId']) assert.equal(Object.hasOwn(forwarded, field), false);
    await send({ isStudent: null });
    assert.equal(forwarded.isStudent, null);
    assert.equal(Object.hasOwn(forwarded, 'studentId'), false);
    await send({ universityId: null, studentId: null });
    assert.equal(Object.hasOwn(forwarded, 'isStudent'), false);
    assert.equal(forwarded.universityId, null);
    assert.equal(forwarded.studentId, null);
    await send({ isStudent: true });
    assert.equal(forwarded.isStudent, true);
    assert.equal(Object.hasOwn(forwarded, 'universityId'), false);
    assert.equal(Object.hasOwn(forwarded, 'studentId'), false);
    await send({ isStudent: true, universityId: null, studentId: null });
    assert.equal(forwarded.universityId, null);
    assert.equal(forwarded.studentId, null);
    await send({ studentId: '' });
    assert.equal(Object.hasOwn(forwarded, 'isStudent'), false);
    assert.equal(forwarded.studentId, '');
    await send(buildProfileCompletionRequest(profile.parse({ ...base, isStudent: true, universityId: 'aub', studentId: null })));
    assert.equal(forwarded.isStudent, true);
    assert.equal(forwarded.universityId, 'aub');
    assert.equal(forwarded.studentId, '');
    await send({ isStudent: false });
    assert.equal(forwarded.isStudent, false);
    assert.equal(forwarded.universityId, null);
    assert.equal(forwarded.studentId, null);
  } finally {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.CLOUDHUB_API_URL;
    else process.env.CLOUDHUB_API_URL = originalUrl;
  }
});

test('sessions default student fields without changing completion status', () => {
  const { parseCloudHubSession } = load('lib/cloudhub-auth.ts');
  const legacy = { token: 'test-token', userId: 1, name: 'Alex', email: 'alex@example.com', role: 'player', profileCompleted: true };
  const session = parseCloudHubSession(legacy).session;
  assert.equal(session.profileCompleted, true);
  assert.equal(session.isStudent, false);
  assert.equal(session.universityId, null);
  const student = parseCloudHubSession({ ...legacy, isStudent: true, universityId: 'uni-1', studentId: '001' }).session;
  assert.equal(student.universityId, 'uni-1');
  assert.equal(student.studentId, '001');
});

test('Google completion renders student choice even with an imported birthday', () => {
  const React = require('react');
  const { renderToStaticMarkup } = require('react-dom/server');
  const formLoader = createLoader({
    'next/navigation': { useRouter: () => ({ refresh() {}, replace() {} }) },
    '@/components/auth/GoogleAuthButton': { GoogleAuthButton: () => null },
  });
  const { AccountSignupForm } = formLoader('components/signup/AccountSignupForm.tsx');
  const { parseCloudHubSession } = load('lib/cloudhub-auth.ts');
  const session = parseCloudHubSession({
    token: 'test-token', userId: 1, name: 'Alex', email: 'alex@example.com', role: 'player',
    profileCompleted: false, firebaseLinked: true, dateOfBirth: '2000-01-01',
  }).session;
  const html = renderToStaticMarkup(React.createElement(AccountSignupForm, { currentSession: session }));
  assert.match(html, /Complete your profile/);
  assert.match(html, /id="isStudent"/);
  assert.match(html, /I am a student/);
  assert.match(html, /type="hidden" name="dateOfBirth"/);
  assert.doesNotMatch(html, /type="date"/);
});

test('public university proxy validates responses and does not forward credentials', async () => {
  const originalFetch = global.fetch;
  const originalUrl = process.env.CLOUDHUB_API_URL;
  process.env.CLOUDHUB_API_URL = 'https://backend.example/';
  try {
    const { GET } = load('app/api/universities/route.ts');
    global.fetch = async (url, options) => {
      assert.equal(url, 'https://backend.example/universities');
      assert.deepEqual(options.headers, { Accept: 'application/json' });
      assert.equal(options.redirect, 'error');
      assert.ok(options.signal);
      return Response.json([{ id: 'uni-1', name: 'University One' }]);
    };
    assert.deepEqual(await (await GET()).json(), [{ id: 'uni-1', name: 'University One' }]);
    global.fetch = async () => Response.json([{ id: 1, name: 'Invalid' }]);
    assert.equal((await GET()).status, 502);
    global.fetch = async () => new Response('', { status: 503 });
    assert.equal((await GET()).status, 502);
    delete process.env.CLOUDHUB_API_URL;
    assert.equal((await GET()).status, 503);
  } finally {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.CLOUDHUB_API_URL;
    else process.env.CLOUDHUB_API_URL = originalUrl;
  }
});

test('signup and completion proxies forward normalized student fields', async () => {
  const originalFetch = global.fetch;
  const originalUrl = process.env.CLOUDHUB_API_URL;
  const originalSheet = process.env.GOOGLE_SHEET_ID;
  process.env.CLOUDHUB_API_URL = 'https://backend.example';
  process.env.GOOGLE_SHEET_ID = 'test-sheet';
  const requests = [];
  const rows = [];
  const routeLoader = createLoader({
    '@/lib/sheets': { appendRegistration: async (...args) => rows.push(args) },
    '@/lib/account-session': { getCurrentAccountSession: async () => ({ userId: 1 }) },
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'test-token' }) }) },
  });
  try {
    global.fetch = async (url, options) => {
      requests.push({ url, data: JSON.parse(options.body) });
      if (url.endsWith('/auth/login')) return Response.json({ token: 'test-token', userId: 1 });
      return Response.json({ id: 1, profileCompleted: true, ...JSON.parse(options.body) });
    };
    const data = { ...base, isStudent: true, universityId: ' uni-1 ', studentId: ' 001 ' };
    const request = (body) => new Request('https://landing.example/api/test', { method: 'POST', body: JSON.stringify(body) });
    assert.equal((await routeLoader('app/api/account-signup/route.ts').POST(request(data))).status, 201);
    assert.equal(rows[0][0].length, 10);
    assert.equal(rows[0][1].studentId, '001');
    const patch = routeLoader('app/api/account-complete-profile/route.ts').PATCH;
    assert.equal((await patch(request(data))).status, 200);
    assert.equal((await patch(request({ ...data, studentId: '' }))).status, 200);
    const cleared = await patch(request({ ...data, isStudent: false }));
    assert.equal((await cleared.json()).universityId, null);
    const mutations = requests.filter((item) => !item.url.endsWith('/auth/login'));
    for (const { data: payload } of mutations.slice(0, 2)) {
      assert.equal(payload.isStudent, true);
      assert.equal(payload.universityId, 'uni-1');
      assert.equal(payload.studentId, '001');
    }
    assert.equal(mutations[2].data.isStudent, true);
    assert.equal(mutations[2].data.universityId, 'uni-1');
    assert.equal(mutations[2].data.studentId, '');
    assert.equal(mutations[3].data.isStudent, false);
    assert.equal(mutations[3].data.universityId, null);
    assert.equal(mutations[3].data.studentId, null);
  } finally {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.CLOUDHUB_API_URL;
    else process.env.CLOUDHUB_API_URL = originalUrl;
    if (originalSheet === undefined) delete process.env.GOOGLE_SHEET_ID;
    else process.env.GOOGLE_SHEET_ID = originalSheet;
  }
});

test('Sheets extends only compatible layouts and stores student IDs as literal text', async () => {
  const envNames = ['GOOGLE_SHEET_ID', 'GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_PRIVATE_KEY'];
  const saved = envNames.map((name) => process.env[name]);
  for (const name of envNames) process.env[name] = 'test-placeholder';
  const header = ['Submission ID', 'Created At', 'Name', 'Email', 'Phone', 'Address', 'DateOfBirth', 'Married', 'AnniversaryDate', 'Note'];
  let existingRows = [header];
  const updates = [];
  const appends = [];
  const sheetsLoader = createLoader({ googleapis: { google: {
    auth: { GoogleAuth: class {} },
    sheets: () => ({ spreadsheets: { values: {
      get: async () => ({ data: { values: existingRows } }),
      update: async (data) => updates.push(data),
      append: async (data) => appends.push(data),
    } } }),
  } } });
  try {
    const { appendRegistration } = sheetsLoader('lib/sheets.ts');
    const row = ['id', 'date', 'Alex', 'alex@example.com', '+96171123456', '', '2000-01-01', '', '', 'note'];
    const student = { isStudent: true, universityId: 'uni-1', studentId: '=unsafe()' };
    await appendRegistration(row, student);
    assert.equal(updates.length, 1);
    assert.ok(updates[0].range.endsWith('!K1:M1'));
    assert.deepEqual(appends[0].requestBody.values[0].slice(0, 10), row);
    assert.deepEqual(appends[0].requestBody.values[0].slice(10), ['Yes', "'uni-1", "'=unsafe()"]);
    existingRows = [[...header, 'Unrelated existing field']];
    await appendRegistration(row, student);
    assert.equal(updates.length, 1);
    assert.deepEqual(appends[1].requestBody.values[0], row);
    existingRows = [header, [...row, 'Existing data without a header']];
    await appendRegistration(row, student);
    assert.equal(updates.length, 1);
    assert.deepEqual(appends[2].requestBody.values[0], row);
    existingRows = [[...header, 'Is Student', 'University ID', 'Student ID']];
    await appendRegistration(row, { ...student, studentId: '001' });
    assert.equal(updates.length, 1);
    assert.equal(appends[3].requestBody.values[0][12], "'001");
    await appendRegistration(row);
    assert.deepEqual(appends[4].requestBody.values[0], row);
  } finally {
    envNames.forEach((name, index) => {
      if (saved[index] === undefined) delete process.env[name];
      else process.env[name] = saved[index];
    });
  }
});
