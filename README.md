# PippaSync

A Playwright-based test automation project for testing the PippaSync application.

## Folder Structure

# File Tree: playwright-with-k6

Generated on: 9/30/2025, 11:53:12 AM
Root path: `/Users/ecomclips/Documents/eclipse-projects/Test/playwright-with-k6`

```
├── .git/ 🚫 (auto-hidden)
├── .idea/ 🚫 (auto-hidden)
├── env/ 🚫 (auto-hidden)
├── fixtures/
│   ├── dev.json
│   ├── prod.json
│   └── stage.json
├── node_modules/ 🚫 (auto-hidden)
├── ortoni-report/
│   ├── ortoni-data/
│   │   └── attachments/
│   │       ├── 427269f70a03218eb4b5-8c59c83b0f526df2fd7b/
│   │       ├── 96146a701106d08e8ca0-75152c6a9833ad0da3fd/
│   │       └── 96146a701106d08e8ca0-d3e3c813845f7fc334d2/
│   ├── trace/
│   │   ├── assets/
│   │   │   ├── codeMirrorModule-B9MwJ51G.js
│   │   │   └── defaultSettingsView-Do_wwdKw.js
│   │   ├── codeMirrorModule.C3UTv-Ge.css
│   │   ├── codicon.DCmgc-ay.ttf
│   │   ├── defaultSettingsView.DVJHpiGt.css
│   │   ├── index.BFsek2M6.css
│   │   ├── index.BZPYnuWQ.js
│   │   ├── index.html
│   │   ├── playwright-logo.svg
│   │   ├── snapshot.html
│   │   ├── sw.bundle.js 🚫 (auto-hidden)
│   │   ├── uiMode.9zHYMU6d.js
│   │   ├── uiMode.BatfzHMG.css
│   │   ├── uiMode.html
│   │   └── xtermModule.Beg8tuEN.css
│   ├── ortoni-data-history.sqlite
│   └── ortoni-report.html
├── pages/
│   ├── api/
│   │   └── auth.api.js
│   ├── auth-services/
│   │   └── signIn.page.js
│   ├── performance/
│   │   ├── auth.perf.js
│   │   ├── base.perf.js
│   │   └── index.js
│   ├── base.page.js
│   └── index.js
├── playwright-report/
│   └── index.html
├── test-results/
│   └── .last-run.json
├── tests/
│   ├── api/
│   │   ├── responses/
│   │   │   └── login-response.json
│   │   └── auth.spec.js
│   ├── e2e/
│   │   └── auth-services/
│   │       └── signIn.spec.js
│   └── perfromance/
│       ├── results/
│       └── auth.k6.js
├── utils/
│   ├── env.js
│   └── fixture-loader.js
├── .DS_Store 🚫 (auto-hidden)
├── README.md
├── WARP.md
├── package-lock.json
├── package.json
└── playwright.config.js
```

## Prerequisites

- Node.js v18+ (required by Playwright 1.55)
- npm v8+
- Git

## Setup

1. Clone and enter the project:

```bash
git clone <repository-url>
cd pippasync
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Environment Configuration

- Runtime environment is selected by `NODE_ENV`:
  - Supported: `dev` (default), `stage`, `prod`
- `utils/env.ts` uses `dotenv` to load `env/.env.<NODE_ENV>`.

Required variables (they have defaults in code, but set them explicitly for real runs):

- `BASE_URL`
- `EMAIL`, `PASSWORD`
- `INVALID_EMAIL`, `INVALID_PASSWORD`

Example `env/.env.dev`:

```bash
BASE_URL=https://dev.pippasync.customeradmin.boostonamazon.com
EMAIL=admin@admin.com
PASSWORD=12345678
INVALID_EMAIL=invalid@admin.com
INVALID_PASSWORD=invali##Password123
```

Switch environments:

```bash
# dev (default)
NODE_ENV=dev npm test

# stage
NODE_ENV=stage npm test

# prod
NODE_ENV=prod npm test
```

## How to Run Tests

- Run all tests:

```bash
npm test
```

- Run headed (see browser UI):

```bash
npm run test:headed
```

- Playwright UI mode:

```bash
npm run test:ui
```

- Run a single spec:

```bash
npx playwright test tests/auth-services/signIn.spec.ts
```

- Run by project/browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

- Run tests matching a title:

```bash
npx playwright test -g "sign in"
```

- Increase workers locally (defaults to CPU cores):

```bash
npx playwright test --workers=4
```

## Reports and Artifacts

- HTML report:

```bash
npx playwright show-report
```

- Output stored under `playwright-report/`.

- Traces:
  - `trace: "on-first-retry"` in `playwright.config.js`.
  - View traces from the HTML report or via:

```bash
npx playwright show-trace <path-to-trace.zip>
```

## Junior-Friendly Data Flow (Sign-in)

- Big picture:

  - Tests call Page Objects → Page Objects use locators/actions → Env/config provide URLs and credentials → Assertions verify outcomes.

- Configuration (`playwright.config.js`):

  - `testDir: "./tests"`
  - `use.baseURL` from `utils/env.ts` (`baseUrl`)
  - Projects: `chromium`, `firefox`, `webkit`
  - `retries`/`workers` adapt to CI via `process.env.CI`
  - Reporter: `html`

- Environment loader (`utils/env.ts`):

  - Reads `NODE_ENV` (defaults to `dev`)
  - Loads `env/.env.<env>` using `dotenv`
  - Exposes:
    - `baseUrl`, `validemail`, `validpassword`, `invalidemail`, `invalidpassword`

- Page Object Model:

  - `pages/base.page.ts`:
    - Wraps the Playwright `page` and provides `navigateTo(url)`.
  - `pages/auth-services/signIn.page.ts`:
    - Extends `BasePage`
    - Locators:
      - `input[name="email"]`, `input[name="password"]`, `button:has-text("Sign In")`
    - Flows:
      - `navigate()`: `page.goto(baseUrl)`
      - `validsignIn()`: fills valid creds, clicks, expects `toHaveURL(baseUrl)`
      - `invalidsignIn()`: fills invalid creds, clicks (assertion to be added as needed)

- Tests (`tests/auth-services/signIn.spec.ts`):

  - Creates `SignInPage(page)`
  - Calls `validsignIn()` for the happy path
  - Calls `invalidsignIn()` for the negative path

- Execution sequence (valid sign-in):
  1. Test runner initializes and passes a `page` to the test.
  2. Test constructs `SignInPage`.
  3. `validsignIn()`:
     - Navigates to `baseUrl` from env.
     - Fills `EMAIL` and `PASSWORD` from env.
     - Clicks Sign In.
     - Verifies final URL (currently `baseUrl`).
  4. Artifacts are captured on retries; report is generated.

Tip: If your app redirects after login, update the assertion:

```ts
await expect(page).toHaveURL("<post-login URL>");
```

## Using Fixtures (Test Data)

- JSON files in `fixtures/` can be imported in tests:

```ts
import devData from "../fixtures/dev.json";
// Use devData.someField in your test
```

- Or load based on `NODE_ENV`:

```ts
import devData from "../fixtures/dev.json";
import stageData from "../fixtures/stage.json";
import prodData from "../fixtures/prod.json";

const env = process.env.NODE_ENV ?? "dev";
const data = env === "prod" ? prodData : env === "stage" ? stageData : devData;
```

- Keep secrets in `.env.*`; keep non-sensitive test data in `fixtures/*.json`.

## Conventions

- Tests live under `tests/**`, grouped by domain (e.g., `auth-services`).
- Page Objects live under `pages/**` mirroring the test structure.
- Re-export page objects from `pages/index.ts` for cleaner imports.
- Prefer role/text selectors where stable; update selectors only in Page Objects.
- One assertion per behavior where possible; keep tests readable and deterministic.

## Debugging

- Headed + slow motion:

```bash
PWDEBUG=1 npx playwright test --headed --project=chromium
```

- Pause in UI:

```ts
// in a test
await page.pause();
```

- Console logs:

  - Use `console.log` sparingly to trace flow in tests.
  - Use `test.step(name, fn)` to group operations in reports.

- Retry a single failing test with trace:

```bash
npx playwright test -g "should sign in successfully" --retries=1
```

## CI Notes

- A workflow exists at `.github/workflows/playwright.yml`.
- Typical CI adjustments:
  - `CI=true` sets `forbidOnly`, increases `retries`, and limits `workers` to `1`.
  - Provide secrets as environment variables in CI (e.g., `BASE_URL`, `EMAIL`, `PASSWORD`).
  - Cache `~/.cache/ms-playwright` or run `npx playwright install --with-deps` in CI images.

## Scripts (from `package.json`)

```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui"
  }
}
```

## Troubleshooting

- Ensure Node >= 18:

```bash
node -v
```

- Reinstall browsers:

```bash
npx playwright install
```

- Clear reports/artifacts:

```bash
rm -rf playwright-report test-results
```

- Wrong environment loaded:

  - Confirm `NODE_ENV` and that `env/.env.<env>` exists and has correct variables.

- Selectors fail:
  - Update locators in the Page Object (`signIn.page.ts`) rather than in tests.

## Next Steps

- Add post-login URL assertion if applicable.
- Expand negative tests to assert specific error messages.
- Add more page objects and specs following the same structure.
