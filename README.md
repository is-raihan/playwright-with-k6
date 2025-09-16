# Playwright + k6 (JavaScript / ESM)

Modern Playwright E2E tests with JavaScript (ESM) and environment-driven config.

### Requirements

- Node.js 18+
- NPM 9+

### Install

```bash
npm i
npx playwright install
```

### Environments

- Env files live in `env/` as `.env.dev`, `.env.stage`, `.env.prod`
- Switch via `NODE_ENV` (defaults to `dev`)
- Required variables:
  - `BASE_URL` (used as base URL in tests)
  - `HOME_URL` (landing page used by specs)

Example: `env/.env.dev`

```bash
BASE_URL=https://yourprojectloginpagedev.com/
HOME_URL=https://yourprojecthomepagedev/homepage/
```

### Scripts

```bash
# Run all tests (headless)
npm test

# Headed mode
npm run test:headed

# UI mode
npm run test:ui

# Per-environment (headed)
npm run test:dev
npm run test:stage
npm run test:prod

# Show last HTML report
npm run test:report
```

### Project structure (key files)

```
pages/
  base.page.js
  index.js
  auth/
    login.page.js
  adminpanel/
    admin.page.js
  deals/
    deals.page.js
  budgets/
    budget.page.js

tests/
  e2e/
    deals/
      createNewDeal.spec.js
      dealsFlow.spec.js

utils/
  env.js

playwright.config.js
```

### Notes

- The project uses ESM: `"type": "module"` in `package.json`.
- `utils/env.js` loads `.env.${NODE_ENV}` and `fixtures/${NODE_ENV}.json`.
- Base URL in Playwright config comes from `process.env.BASE_URL`.

### Useful commands

```bash
# List discovered tests
npx playwright test -c ./playwright.config.js --list

# Debug a single test (headed)
npx playwright test tests/e2e/deals/createNewDeal.spec.js --headed --project=chromium
```
