# 🚀 PippaSync Test Automation Suite

A comprehensive end-to-end testing framework combining **Playwright** for functional testing and **K6** for performance testing. This project provides robust test automation for the PippaSync application with multi-environment support, advanced reporting, and CI/CD integration.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Performance Testing](#performance-testing)
- [Reports & Analytics](#reports--analytics)
- [CI/CD Pipeline](#cicd-pipeline)
- [Project Structure](#project-structure)
- [Development Guide](#development-guide)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

This test automation suite is designed for the **PippaSync** application, providing:

- **Functional Testing**: End-to-end UI testing with Playwright
- **Performance Testing**: Load testing with K6
- **Multi-Environment Support**: Dev, Stage, and Production environments
- **Advanced Reporting**: Ortoni reports with detailed analytics
- **CI/CD Integration**: GitHub Actions workflow with automated reporting

## ✨ Features

### 🧪 Testing Capabilities
- **Cross-browser Testing**: Chromium, Firefox, WebKit support
- **Page Object Model**: Maintainable and scalable test architecture
- **Parallel Execution**: Optimized test execution with configurable workers
- **Retry Logic**: Smart retry mechanisms for flaky tests
- **Trace Recording**: Detailed execution traces for debugging

### 📊 Performance Testing
- **Load Testing**: K6-based performance testing
- **Custom Metrics**: Login duration, success rates, failure tracking
- **Threshold Monitoring**: Performance SLA validation
- **Realistic Scenarios**: Ramp-up/down patterns for realistic load simulation

### 🌍 Environment Management
- **Multi-Environment**: Dev, Stage, Production configurations
- **Environment Isolation**: Separate configs and test data per environment
- **Secure Credentials**: Environment-specific credential management
- **Dynamic Configuration**: Runtime environment switching

### 📈 Reporting & Analytics
- **Ortoni Reports**: Advanced HTML reports with rich analytics
- **K6 Performance Reports**: Detailed performance metrics and trends
- **Trace Analysis**: Step-by-step execution analysis
- **CI/CD Integration**: Automated report generation and publishing

## 🏗️ Architecture

### Test Framework Stack
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Playwright    │    │      K6         │    │   Ortoni        │
│   (E2E Tests)   │    │ (Performance)   │    │  (Reporting)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  GitHub Actions │
                    │   (CI/CD)       │
                    └─────────────────┘
```

### Page Object Model
```
pages/
├── base.page.js          # Base page class
├── auth-services/
│   └── signIn.page.js    # Authentication page object
└── performance/
    ├── base.perf.js      # Base performance class
    └── auth.perf.js      # Auth performance tests
```

### Environment Structure
```
env/
├── .env.dev              # Development environment
├── .env.stage            # Staging environment
└── .env.prod             # Production environment

fixtures/
├── dev.json              # Dev test data
├── stage.json            # Stage test data
└── prod.json             # Prod test data
```

## 🔧 Prerequisites

- **Node.js**: v18+ (required by Playwright 1.55)
- **npm**: v8+
- **Git**: For version control
- **K6**: For performance testing (auto-installed via npm scripts)

## 🚀 Quick Start

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repository-url>
cd playwright-with-k6

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### 2. Environment Configuration
```bash
# Create environment files (example for dev)
cp env/.env.example env/.env.dev

# Edit with your credentials
nano env/.env.dev
```

### 3. Run Tests
```bash
# Run all tests
npm test

# Run with browser UI
npm run test:headed

# Run performance tests
npm run k6
```

## 🌍 Environment Configuration

### Environment Variables

Create environment-specific `.env` files in the `env/` directory:

**`env/.env.dev`**
```bash
BASE_URL=https://dev.pippasync.customeradmin.boostonamazon.com
API_URL=https://dev.pippasync.inventory.service.boostonamazon.com
EMAIL=admin@admin.com
PASSWORD=12345678
INVALID_EMAIL=invalid@admin.com
INVALID_PASSWORD=invali##Password123
```

**`env/.env.stage`**
```bash
BASE_URL=https://stage.pippasync.customeradmin.boostonamazon.com
API_URL=https://stage.pippasync.inventory.service.boostonamazon.com
EMAIL=admin@stage.com
PASSWORD=stage_password
# ... other variables
```

**`env/.env.prod`**
```bash
BASE_URL=https://prod.pippasync.customeradmin.boostonamazon.com
API_URL=https://prod.pippasync.inventory.service.boostonamazon.com
EMAIL=admin@prod.com
PASSWORD=prod_password
# ... other variables
```

### Environment Switching
```bash
# Development (default)
NODE_ENV=dev npm test

# Staging
NODE_ENV=stage npm test

# Production
NODE_ENV=prod npm test
```

## 🧪 Testing

### Functional Testing (Playwright)

#### Basic Commands
```bash
# Run all tests
npm test

# Run with browser UI visible
npm run test:headed

# Interactive UI mode
npm run test:ui

# Debug mode
npm run test:debug
```

#### Advanced Testing
```bash
# Run specific test file
npx playwright test tests/e2e/auth-services/signIn.spec.js

# Run by browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run tests matching pattern
npx playwright test -g "sign in"

# Run with custom workers
npx playwright test --workers=4

# Run with retries
npx playwright test --retries=2
```

#### Debugging
```bash
# Debug with headed mode
PWDEBUG=1 npx playwright test --headed --project=chromium

# Pause execution in tests
await page.pause();

# Step-by-step debugging
await test.step('Step name', async () => {
  // Your test code
});
```

### Test Structure

#### Page Objects
```javascript
// pages/auth-services/signIn.page.js
class SignInPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators
  emailInput = 'input[name="email"]';
  passwordInput = 'input[name="password"]';
  signInButton = 'button:has-text("Sign In")';

  // Actions
  async validsignIn() {
    await this.navigate();
    await this.page.fill(this.emailInput, validemail);
    await this.page.fill(this.passwordInput, validpassword);
    await this.page.click(this.signInButton);
    await expect(this.page).toHaveURL(baseUrl);
  }
}
```

#### Test Files
```javascript
// tests/e2e/auth-services/signIn.spec.js
const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../../../pages');

test.describe('Sign In', () => {
  test('should sign in successfully', async ({ page }) => {
    const signInPage = new SignInPage(page);
    await signInPage.validsignIn();
  });
});
```

## ⚡ Performance Testing

### K6 Performance Tests

#### Basic Commands
```bash
# Run performance tests (dev environment)
npm run k6

# Run for specific environment
npm run k6:dev
npm run k6:stage
npm run k6:prod

# View performance reports
npm run k6:report
```

#### Performance Test Configuration
```javascript
// tests/perfromance/auth.k6.js
export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Ramp up to 5 users
    { duration: '1m', target: 5 },    // Stay at 5 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<1300'], // 95% under 1300ms
    login_duration: ['p(95)<1300', 'p(99)<1800'],
    failed_requests: ['rate<0.3'],
  }
};
```

#### Custom Metrics
```javascript
// Custom performance metrics
const loginDuration = new Trend('login_duration');
const successfulLogins = new Counter('successful_logins');
const failedRequests = new Rate('failed_requests');
```

### Performance Test Results
- **HTML Reports**: Detailed performance analysis
- **JSON Data**: Machine-readable metrics
- **Thresholds**: SLA compliance monitoring
- **Trends**: Performance over time analysis

## 📊 Reports & Analytics

### Ortoni Reports
```bash
# View Ortoni report
npm run open:ortoni

# Or manually open
open ortoni-report/ortoni-report.html
```

### Playwright Reports
```bash
# View HTML report
npm run test:report

# Or manually
npx playwright show-report
```

### K6 Performance Reports
```bash
# View K6 report
npm run k6:report

# Or manually
open k6-results/summary.html
```

### Report Features
- **Interactive Dashboards**: Rich HTML reports with filtering
- **Trace Analysis**: Step-by-step execution traces
- **Performance Metrics**: Detailed K6 performance data
- **Screenshot Capture**: Visual test evidence
- **Video Recording**: Test execution videos (on failure)

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline:

#### Workflow Triggers
- **Push**: Main/master branch pushes
- **Pull Request**: PR to main/master
- **Manual Dispatch**: Manual workflow execution

#### Pipeline Jobs

1. **Playwright Tests**
   - Node.js 18 setup
   - Dependency installation
   - Browser installation
   - Test execution
   - Report generation

2. **K6 Performance Tests**
   - K6 installation
   - Performance test execution
   - Results collection

3. **Report Publishing**
   - Report aggregation
   - GitHub Pages deployment
   - Artifact retention

#### Artifacts
- **Playwright Reports**: HTML reports and traces
- **Ortoni Reports**: Advanced analytics
- **K6 Results**: Performance metrics
- **GitHub Pages**: Public report hosting

### CI Configuration
```yaml
# .github/workflows/playwright-with-k6.yml
name: Playwright and K6 Tests by RK

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

jobs:
  playwright-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
        env:
          CI: true
```

## 📁 Project Structure

```
playwright-with-k6/
├── .github/
│   └── workflows/
│       └── playwright-with-k6.yml    # CI/CD pipeline
├── env/                              # Environment configs
│   ├── .env.dev
│   ├── .env.stage
│   └── .env.prod
├── fixtures/                         # Test data
│   ├── dev.json
│   ├── stage.json
│   └── prod.json
├── k6-results/                       # K6 performance results
│   ├── summary.html
│   └── summary.json
├── ortoni-report/                    # Ortoni analytics
│   ├── ortoni-report.html
│   └── ortoni-data/
├── pages/                            # Page Object Model
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
├── tests/                            # Test files
│   ├── api/
│   │   ├── auth.spec.js
│   │   └── responses/
│   ├── e2e/
│   │   └── auth-services/
│   │       └── signIn.spec.js
│   └── perfromance/
│       ├── auth.k6.js
│       ├── env-config.js
│       └── k6-report.js
├── utils/                            # Utilities
│   ├── env.js
│   └── fixture-loader.js
├── playwright.config.js              # Playwright config
├── package.json                      # Dependencies
└── README.md                         # This file
```

## 🛠️ Development Guide

### Adding New Tests

#### 1. Create Page Object
```javascript
// pages/new-feature/newPage.page.js
const { expect } = require('@playwright/test');
const { BasePage } = require('../base.page');

class NewPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators
  newElement = 'selector';

  // Actions
  async performAction() {
    await this.page.click(this.newElement);
  }
}

module.exports = { NewPage };
```

#### 2. Create Test File
```javascript
// tests/e2e/new-feature/newTest.spec.js
const { test, expect } = require('@playwright/test');
const { NewPage } = require('../../../pages');

test.describe('New Feature', () => {
  test('should perform new action', async ({ page }) => {
    const newPage = new NewPage(page);
    await newPage.performAction();
    // Add assertions
  });
});
```

#### 3. Export from Pages Index
```javascript
// pages/index.js
const { NewPage } = require('./new-feature/newPage.page');

module.exports = {
  // ... existing exports
  NewPage
};
```

### Adding Performance Tests

#### 1. Create Performance Page Object
```javascript
// pages/performance/newFeature.perf.js
import { BasePerformance } from './base.perf.js';

export class NewFeaturePerformance extends BasePerformance {
  constructor(http, env) {
    super(http, env);
  }

  async performNewAction() {
    // Performance test implementation
  }
}
```

#### 2. Create K6 Test
```javascript
// tests/perfromance/newFeature.k6.js
import { NewFeaturePerformance } from '../../pages/performance/newFeature.perf.js';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
  }
};

export default function() {
  const perf = new NewFeaturePerformance(http, env);
  // Test implementation
}
```

### Best Practices

#### Page Object Model
- **Single Responsibility**: One page object per page/feature
- **Encapsulation**: Hide implementation details
- **Reusability**: Common actions in base classes
- **Maintainability**: Clear naming and structure

#### Test Organization
- **Domain-based**: Group by feature/domain
- **Descriptive Names**: Clear test descriptions
- **Independent Tests**: No test dependencies
- **Data-driven**: Use fixtures for test data

#### Performance Testing
- **Realistic Scenarios**: Real-world load patterns
- **Proper Thresholds**: Meaningful performance criteria
- **Resource Monitoring**: Track system resources
- **Baseline Establishment**: Performance baselines

## 🔧 Troubleshooting

### Common Issues

#### Playwright Issues
```bash
# Browser installation issues
npx playwright install

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install

# Permission issues (Linux/Mac)
sudo npx playwright install
```

#### Environment Issues
```bash
# Check environment variables
echo $NODE_ENV

# Verify environment files exist
ls -la env/

# Test environment loading
node -e "console.log(require('./utils/env'))"
```

#### K6 Issues
```bash
# Install K6 manually
# macOS
brew install k6

# Linux
curl -L https://github.com/grafana/k6/releases/download/v0.46.0/k6-v0.46.0-linux-amd64.tar.gz -o k6.tar.gz
tar -xzf k6.tar.gz
sudo cp k6-v0.46.0-linux-amd64/k6 /usr/local/bin

# Windows
choco install k6
```

#### Report Issues
```bash
# Clear old reports
rm -rf playwright-report test-results ortoni-report k6-results

# Regenerate reports
npm test
npm run k6
```

### Debug Commands
```bash
# Debug Playwright
PWDEBUG=1 npx playwright test --headed

# Debug K6
k6 run --http-debug tests/perfromance/auth.k6.js

# Check environment
node -e "console.log(process.env)"

# Verify dependencies
npm list
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

### Code Standards
- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Tests**: Maintain test coverage
- **Documentation**: Update README for new features

### Pull Request Process
1. **Tests**: All tests must pass
2. **Documentation**: Update relevant docs
3. **Review**: Code review required
4. **CI/CD**: Pipeline must pass
5. **Merge**: Squash and merge

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Raihan Khan** - *Initial work* - [GitHub Profile]

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - End-to-end testing framework
- [K6](https://k6.io/) - Performance testing tool
- [Ortoni](https://github.com/ortoni-io/ortoni-report) - Advanced reporting
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation

---

## 📞 Support

For questions, issues, or contributions:

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)
- **Documentation**: [Project Wiki](https://github.com/your-repo/wiki)

---

**Happy Testing! 🚀**