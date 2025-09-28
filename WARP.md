# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Playwright-based end-to-end test automation project for testing the PippaSync application. It uses TypeScript and follows the Page Object Model pattern for maintainable test code.

## Essential Commands

### Development Setup
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests
```bash
# Run all tests
npm test

# Run with browser UI visible  
npm run test:headed

# Run in Playwright UI mode (interactive)
npm run test:ui

# Run with debugger
npm run test:debug
# or
PWDEBUG=1 npx playwright test

# Run specific test file
npx playwright test tests/auth-services/signIn.spec.ts

# Run tests by browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests matching a pattern
npx playwright test -g "sign in"

# Run with custom worker count
npx playwright test --workers=4
```

### Environment Management
```bash
# Run against different environments
NODE_ENV=dev npm test      # default
NODE_ENV=stage npm test
NODE_ENV=prod npm test
```

### Reports and Debugging
```bash
# View HTML test report
npm run test:report
# or
npx playwright show-report

# View trace files
npx playwright show-trace <path-to-trace.zip>

# Debug with headed mode and slow motion
PWDEBUG=1 npx playwright test --headed --project=chromium
```

## Architecture Overview

### Environment Configuration System
- **Multi-environment support**: Environments are controlled via `NODE_ENV` (dev/stage/prod)
- **Configuration loading**: `utils/env.ts` uses dotenv to load environment-specific `.env` files from the `env/` directory
- **Environment isolation**: Each environment has its own configuration file and test data fixtures

### Page Object Model Architecture
The project follows a strict Page Object Model pattern:

- **Base Page (`pages/base.page.ts`)**: Foundation class providing common page functionality like navigation
- **Feature Pages**: Extend BasePage and encapsulate page-specific locators, actions, and assertions
- **Index Exports (`pages/index.ts`)**: Central export point for clean imports across tests
- **Locator Strategy**: Uses CSS selectors with preference for name attributes and text-based selectors

### Test Data Management
- **Fixtures**: JSON files in `fixtures/` directory provide environment-specific test data
- **Environment Variables**: Sensitive data (credentials, URLs) stored in `.env.*` files
- **Data Isolation**: Each environment (dev/stage/prod) has corresponding fixture and env files

### Test Organization
- **Domain-based Structure**: Tests organized by feature domains (e.g., `auth-services/`)
- **Spec Files**: Test files use `.spec.ts` extension and mirror the page object structure
- **Parallel Execution**: Tests run in parallel by default with browser-specific projects

## Key Files and Their Purposes

- **`playwright.config.ts`**: Central configuration for test execution, browsers, and environment setup
- **`utils/env.ts`**: Environment configuration loader and variable exports
- **`pages/base.page.ts`**: Base class for all page objects with common functionality
- **`fixtures/*.json`**: Environment-specific test data that's not sensitive
- **`env/.env.*`**: Environment-specific configuration files (gitignored)

## Development Patterns

### Adding New Page Objects
1. Create page class extending `BasePage` in appropriate domain folder under `pages/`
2. Define private locators as class properties
3. Implement public methods for user actions and verifications
4. Export from `pages/index.ts`

### Adding New Tests
1. Create `.spec.ts` file in `tests/` mirroring the page object structure
2. Import page objects from `pages/` index
3. Use `test.describe()` for grouping related tests
4. Follow naming convention: "should [action] [expectation]"

### Environment-Specific Development
- Environment variables are loaded automatically based on `NODE_ENV`
- Required variables: `BASE_URL`, `EMAIL`, `PASSWORD`, `INVALID_EMAIL`, `INVALID_PASSWORD`
- Test data can be loaded from corresponding fixture files or environment variables

### Debugging Practices
- Use `await page.pause()` to pause execution in UI mode
- Utilize `test.step()` for better test reporting and organization
- Leverage trace files for post-execution debugging
- Console.log sparingly for test flow tracing

## CI/CD Integration

The project includes a GitHub Actions workflow (currently commented out in `.github/workflows/playwright.yml`) that:
- Supports multiple environments via manual dispatch
- Runs on schedule and PR triggers  
- Caches Playwright browsers for performance
- Uploads test artifacts (reports, traces, videos)
- Uses CI-specific settings (retries, workers, forbidOnly)
