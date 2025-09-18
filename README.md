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
k6 run -e BASE_URL=https://yourapp.com/tests/performance/load/
```
