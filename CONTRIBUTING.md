# 🤝 Contributing to PippaSync Test Automation

Thank you for your interest in contributing to the PippaSync Test Automation project! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Documentation](#documentation)

## 🤝 Code of Conduct

This project follows a professional and respectful environment. Please:

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow professional communication standards
- Report any inappropriate behavior

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v8+
- Git
- Basic knowledge of Playwright and K6

### Setup Development Environment

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/playwright-with-k6.git
   cd playwright-with-k6
   ```

2. **Install Dependencies**
   ```bash
   npm install
   npx playwright install
   ```

3. **Setup Environment**
   ```bash
   # Copy environment template
   cp env/.env.example env/.env.dev
   
   # Edit with your test credentials
   nano env/.env.dev
   ```

4. **Run Tests**
   ```bash
   npm test
   npm run k6
   ```

## 🔄 Development Workflow

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: New features (e.g., `feature/new-test-suite`)
- **bugfix/**: Bug fixes (e.g., `bugfix/fix-selector`)
- **hotfix/**: Critical fixes (e.g., `hotfix/security-patch`)

### Creating a New Branch

```bash
# Create and switch to new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b bugfix/issue-description
```

### Commit Guidelines

Use conventional commit messages:

```bash
# Feature
git commit -m "feat: add user registration test suite"

# Bug fix
git commit -m "fix: correct login selector for new UI"

# Documentation
git commit -m "docs: update README with new commands"

# Performance
git commit -m "perf: optimize K6 test execution time"

# Test
git commit -m "test: add edge cases for auth flow"
```

## 📝 Coding Standards

### JavaScript/Node.js

- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Naming**: Use descriptive, camelCase names
- **Comments**: Document complex logic
- **Functions**: Keep functions small and focused

### Playwright Tests

#### Page Object Model
```javascript
// ✅ Good: Clear, maintainable page object
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Locators
  emailInput = 'input[name="email"]';
  passwordInput = 'input[name="password"]';
  loginButton = 'button[type="submit"]';

  // Actions
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
```

#### Test Structure
```javascript
// ✅ Good: Clear test structure
test.describe('User Authentication', () => {
  test('should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validEmail, validPassword);
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### K6 Performance Tests

```javascript
// ✅ Good: Well-structured K6 test
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
  // Test implementation
}
```

## 🧪 Testing Guidelines

### Test Requirements

- **All tests must pass** before submitting PR
- **New features require tests**
- **Bug fixes require regression tests**
- **Performance tests for critical paths**

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npx playwright test tests/e2e/auth-services/

# Run performance tests
npm run k6

# Run with debugging
npm run test:debug
```

### Test Coverage

- **E2E Tests**: Cover user journeys
- **API Tests**: Cover backend endpoints
- **Performance Tests**: Cover critical paths
- **Edge Cases**: Cover error scenarios

## 📤 Pull Request Process

### Before Submitting

1. **Update Documentation**
   - Update README.md if needed
   - Add/update code comments
   - Update CHANGELOG.md

2. **Run Full Test Suite**
   ```bash
   npm test
   npm run k6
   npm run test:report
   ```

3. **Check Code Quality**
   ```bash
   # Lint code
   npm run lint
   
   # Format code
   npm run format
   ```

### PR Requirements

- **Clear Title**: Descriptive PR title
- **Description**: What changes and why
- **Tests**: All tests pass
- **Documentation**: Updated if needed
- **Screenshots**: For UI changes
- **Performance**: No regression

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added
- [ ] Performance tests run

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.17.0]
- Playwright version: [e.g. 1.55.0]

**Additional context**
Add any other context about the problem.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots.
```

## 📚 Documentation

### Documentation Standards

- **Clear and concise** language
- **Code examples** for complex concepts
- **Screenshots** for UI-related changes
- **Links** to relevant resources
- **Version information** when applicable

### Types of Documentation

- **README.md**: Project overview and setup
- **API Documentation**: For new API tests
- **Performance Guides**: For K6 test optimization
- **Troubleshooting**: Common issues and solutions

## 🏗️ Project Structure

### Adding New Tests

1. **Create Page Object** (if needed)
   ```bash
   # Create new page object
   touch pages/new-feature/newPage.page.js
   ```

2. **Create Test File**
   ```bash
   # Create test file
   touch tests/e2e/new-feature/newTest.spec.js
   ```

3. **Update Exports**
   ```javascript
   // Update pages/index.js
   const { NewPage } = require('./new-feature/newPage.page');
   module.exports = { NewPage };
   ```

### Adding Performance Tests

1. **Create Performance Page Object**
   ```bash
   touch pages/performance/newFeature.perf.js
   ```

2. **Create K6 Test**
   ```bash
   touch tests/perfromance/newFeature.k6.js
   ```

3. **Update Package Scripts**
   ```json
   {
     "scripts": {
       "k6:new-feature": "k6 run tests/perfromance/newFeature.k6.js"
     }
   }
   ```

## 🔧 Development Tools

### Recommended VS Code Extensions

- **Playwright Test for VSCode**: Playwright integration
- **JavaScript (ES6) code snippets**: Code snippets
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **GitLens**: Git integration

### Useful Commands

```bash
# Debug specific test
npx playwright test tests/e2e/auth-services/signIn.spec.js --debug

# Run tests in specific browser
npx playwright test --project=chromium

# Generate test code
npx playwright codegen https://your-app.com

# Show test report
npx playwright show-report

# Show trace
npx playwright show-trace trace.zip
```

## 🎯 Contribution Areas

### High Priority
- **New Test Suites**: Additional feature coverage
- **Performance Optimization**: K6 test improvements
- **Documentation**: Guides and tutorials
- **Bug Fixes**: Stability improvements

### Medium Priority
- **Code Refactoring**: Improve maintainability
- **CI/CD Enhancements**: Pipeline improvements
- **Reporting Features**: Enhanced analytics
- **Environment Support**: Additional environments

### Low Priority
- **Code Style**: Formatting improvements
- **Comments**: Code documentation
- **Examples**: Sample test cases
- **Utilities**: Helper functions

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Request Comments**: Code review discussions

### Resources

- [Playwright Documentation](https://playwright.dev/)
- [K6 Documentation](https://k6.io/docs/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🏆 Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **CHANGELOG.md**: Release notes
- **GitHub**: Contributor statistics

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC License).

---

Thank you for contributing to PippaSync Test Automation! 🚀
