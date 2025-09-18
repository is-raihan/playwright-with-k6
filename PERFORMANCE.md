# 🎭 Playwright + k6 Testing Framework

> **Modern E2E and Performance Testing Suite** with JavaScript (ESM), multi-environment support, and comprehensive reporting.

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Latest-orange.svg)](https://playwright.dev/)
[![k6](https://img.shields.io/badge/k6-Performance-purple.svg)](https://k6.io/)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **npm** 9+
- **k6** (for performance testing) - [Installation Guide](https://k6.io/docs/getting-started/installation/)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd playwright-with-k6

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## 🏗️ Project Architecture

```
playwright-with-k6/
├── 📁 env/                     # Environment configurations
│   ├── .env.dev
│   ├── .env.stage
│   └── .env.prod
├── 📁 fixtures/               # Test data files
│   ├── dev.json
│   ├── stage.json
│   └── prod.json
├── 📁 pages/                  # Page Object Models
│   ├── base.page.js          # Base page class
│   ├── index.js              # Page aggregator
│   ├── 📁 auth/
│   │   └── login.page.js
│   ├── 📁 adminpanel/
│   │   └── admin.page.js
│   ├── 📁 budgets/
│   │   └── budget.page.js
│   └── 📁 deals/
│       └── deals.page.js
├── 📁 tests/
│   ├── 📁 e2e/               # End-to-end tests
│   │   ├── 📁 deals/
│   │   │   ├── createNewDeal.spec.js
│   │   │   └── dealsFlow.spec.js
│   │   └── 📁 login/
│   └── 📁 performance/       # k6 performance tests
│       ├── 📁 load/
│       │   └── load-test.js
│       └── 📁 spike/
│           └── spike-test.js
├── 📁 utils/
│   └── env.js                # Environment utilities
├── playwright.config.js      # Playwright configuration
├── package.json
└── README.md
```

## 🌍 Environment Configuration

### Environment Variables

Create environment-specific files in the `env/` directory:

```bash
# env/.env.dev
BASE_URL=https://dev.yourapp.com
HOME_URL=https://dev.yourapp.com/dashboard
```

```bash
# env/.env.stage
BASE_URL=https://staging.yourapp.com
HOME_URL=https://staging.yourapp.com/dashboard
```

```bash
# env/.env.prod
BASE_URL=https://prod.yourapp.com
HOME_URL=https://prod.yourapp.com/dashboard
```

### Test Data Fixtures

Configure test data in `fixtures/` directory:

```json
// fixtures/dev.json
{
  "credentials": {
    "validUser": {
      "username": "testuser",
      "password": "testpass"
    }
  },
  "testData": {
    "dealAmount": 1000,
    "budgetLimit": 5000
  }
}
```

## 🧪 Running Tests

### E2E Tests (Playwright)

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Interactive UI mode
npm run test:ui

# Environment-specific test runs
npm run test:dev     # Development environment
npm run test:stage   # Staging environment  
npm run test:prod    # Production environment

# Run specific browser
npm run test:chromium
```

### Performance Tests (k6)

```bash
# Load testing
k6 run tests/performance/load/load-test.js

# Spike testing
k6 run tests/performance/spike/spike-test.js

# With environment variables
k6 run -e BASE_URL=https://yourapp.com tests/performance/load/load-test.js

# With Docker
docker run -i grafana/k6 run - < tests/performance/load/load-test.js
```

## 📊 Test Reports

### Playwright Reports

```bash
# Generate and open HTML report
npm run test:report

# View last test results
npx playwright show-report
```

### k6 Results

k6 outputs performance metrics directly to the console. For advanced reporting:

```bash
# Export results to JSON
k6 run --out json=results.json tests/performance/load/load-test.js

# With InfluxDB (requires setup)
k6 run --out influxdb=http://localhost:8086/mydb tests/performance/load/load-test.js
```

## 🔧 Advanced Usage

### Debugging Tests

```bash
# Debug specific test
npx playwright test tests/e2e/deals/createNewDeal.spec.js --debug

# Run with trace viewer
npx playwright test --trace on

# Generate trace for failed tests only
npx playwright test --trace retain-on-failure
```

### Test Discovery

```bash
# List all discovered tests
npx playwright test --list

# List tests matching pattern
npx playwright test --list deals
```

### Custom Commands

```bash
# Run tests with custom timeout
npx playwright test --timeout=60000

# Run specific project
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4
```

## 🏗️ Page Object Model

This project uses the Page Object Model pattern for maintainable test code:

```javascript
// Example: pages/deals/deals.page.js
import { BasePage } from '../base.page.js';

export class DealsPage extends BasePage {
  constructor(page) {
    super(page);
    this.createDealButton = page.getByRole('button', { name: 'Create Deal' });
    this.dealAmountInput = page.getByLabel('Deal Amount');
  }

  async createNewDeal(amount) {
    await this.createDealButton.click();
    await this.dealAmountInput.fill(amount.toString());
    await this.waitForLoadState();
  }
}
```

## 🎯 Key Features

- **✅ Multi-environment support** - Dev, Staging, Production
- **✅ Page Object Model** - Maintainable test architecture  
- **✅ ESM modules** - Modern JavaScript syntax
- **✅ Cross-browser testing** - Chrome, Firefox, Safari
- **✅ Performance testing** - k6 integration
- **✅ Rich reporting** - HTML reports with traces
- **✅ CI/CD ready** - GitHub Actions support
- **✅ Data-driven tests** - JSON fixtures
- **✅ Visual testing** - Screenshot comparisons
- **✅ API testing** - REST API validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 Best Practices

### Test Organization

- Keep tests focused and atomic
- Use descriptive test names
- Group related tests in describe blocks
- Implement proper cleanup in afterEach/afterAll

### Page Objects

- Encapsulate page interactions
- Use meaningful selector strategies
- Keep page objects focused on single pages
- Avoid business logic in page objects

### Environment Management

- Never commit sensitive data
- Use environment-specific configurations
- Validate required environment variables
- Provide meaningful defaults

## 🚨 Troubleshooting

### Common Issues

**Browser not found:**

```bash
npx playwright install chromium
```

**Port already in use:**

```bash
lsof -ti:3000 | xargs kill -9
```

**Environment variables not loading:**

- Check file paths in `env/` directory
- Verify `NODE_ENV` is set correctly
- Ensure `.env.*` files have proper format

### Debug Mode

Enable verbose logging:

```bash
DEBUG=pw:api npx playwright test
```

## 📄 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [k6 Documentation](https://k6.io/docs/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Page Object Model Guide](https://playwright.dev/docs/pom)

---

**Happy Testing! 🎭🚀**
