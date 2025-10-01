# 🚀 WARP Development Guide

Quick reference for WARP (warp.dev) when working with this Playwright + K6 test automation project.

## 🎯 Project Overview

**PippaSync Test Automation** - Comprehensive testing framework combining:
- **Playwright**: End-to-end functional testing
- **K6**: Performance and load testing  
- **Ortoni**: Advanced reporting and analytics
- **Multi-Environment**: Dev, Stage, Production support

## ⚡ Quick Commands

### Setup & Installation
```bash
npm install && npx playwright install
```

### Running Tests
```bash
# All tests
npm test

# With browser UI
npm run test:headed

# Interactive mode
npm run test:ui

# Performance tests
npm run k6

# Everything
npm run test:all
```

### Environment Switching
```bash
NODE_ENV=dev npm test      # Development
NODE_ENV=stage npm test   # Staging  
NODE_ENV=prod npm test     # Production
```

### Debugging
```bash
# Debug mode
npm run test:debug

# Headed debugging
PWDEBUG=1 npx playwright test --headed

# Specific test
npx playwright test tests/e2e/auth-services/signIn.spec.js
```

## 🏗️ Architecture

### Page Object Model
- **Base Page**: `pages/base.page.js` - Common functionality
- **Feature Pages**: Domain-specific page objects
- **Locators**: CSS selectors with name attributes preferred
- **Actions**: Encapsulated user interactions

### Environment System
- **Multi-Environment**: `NODE_ENV` controls environment
- **Configuration**: `utils/env.js` loads environment variables
- **Test Data**: `fixtures/` for environment-specific data
- **Isolation**: Separate configs per environment

### Test Organization
- **E2E Tests**: `tests/e2e/` - User journey testing
- **API Tests**: `tests/api/` - Backend testing
- **Performance**: `tests/perfromance/` - K6 load tests
- **Parallel**: Tests run in parallel by default

## 🔧 Development Patterns

### Adding New Tests
1. Create page object in `pages/domain/`
2. Create test file in `tests/e2e/domain/`
3. Export from `pages/index.js`
4. Follow naming: "should [action] [expectation]"

### Adding Performance Tests
1. Create performance class in `pages/performance/`
2. Create K6 test in `tests/perfromance/`
3. Update package.json scripts
4. Set realistic thresholds

### Environment Variables
Required in `env/.env.*`:
- `BASE_URL` - Application URL
- `EMAIL` / `PASSWORD` - Valid credentials
- `INVALID_EMAIL` / `INVALID_PASSWORD` - Invalid credentials

## 📊 Reporting

### Report Types
- **Ortoni**: `npm run open:ortoni` - Advanced analytics
- **Playwright**: `npm run test:report` - Standard results
- **K6**: `npm run k6:report` - Performance metrics

### Debugging Tools
- **Traces**: `npx playwright show-trace <trace.zip>`
- **Screenshots**: Captured on failures
- **Videos**: Recorded in headed mode
- **Console**: Browser console logs

## 🚀 CI/CD Pipeline

### GitHub Actions
- **Triggers**: Push, PR, Manual dispatch
- **Jobs**: Playwright tests → K6 tests → Report publishing
- **Artifacts**: Reports, traces, videos
- **Pages**: Public report hosting

### Environment Support
- **Development**: Local testing
- **Staging**: Pre-production validation
- **Production**: Live environment testing

## 🛠️ Troubleshooting

### Common Issues
```bash
# Browser issues
npx playwright install

# Environment issues  
node -e "console.log(require('./utils/env'))"

# Clean artifacts
npm run clean

# Debug specific test
npx playwright test --debug tests/e2e/auth-services/signIn.spec.js
```

### Performance Issues
- Reduce K6 VU count
- Check thresholds
- Monitor memory usage
- Use realistic test data

## 📚 Key Files

| File | Purpose |
|------|---------|
| `playwright.config.js` | Test configuration |
| `utils/env.js` | Environment loader |
| `pages/base.page.js` | Base page class |
| `tests/e2e/` | E2E test files |
| `tests/perfromance/` | K6 performance tests |
| `env/.env.*` | Environment configs |

## 🎯 Best Practices

- **Page Objects**: Encapsulate page interactions
- **Test Data**: Use fixtures for non-sensitive data
- **Environment**: Keep credentials in `.env` files
- **Debugging**: Use `await page.pause()` for inspection
- **Performance**: Start with low VU counts
- **Reporting**: Check Ortoni reports for insights

---

**Quick Start**: `npm run setup && npm test`  
**Full Documentation**: See `README.md` and `DOCUMENTATION.md`
