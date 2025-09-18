# CI/CD Pipeline Setup for Playwright + k6

This document outlines the setup for a CI/CD pipeline for the Playwright + k6 project using GitHub Actions. The pipeline includes steps for installing dependencies, running tests, and deploying the application.

## GitHub Actions Workflow

Create a new workflow file in the `.github/workflows` directory named `ci-cd-pipeline.yml`. This file will define the CI/CD pipeline.

### Workflow Configuration

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          npm install
          npx playwright install

      - name: Run tests
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          HOME_URL: ${{ secrets.HOME_URL }}
          NODE_ENV: dev
        run: npm test

      - name: Deploy application
        run: |
          echo "Deploying application..."
          # Add your deployment commands here
```

### Environment Variables and Secrets

1. **Environment Variables**: The pipeline uses environment variables for configuration. You can set these in the GitHub repository settings under "Secrets and variables".

2. **Required Secrets**:
   - `BASE_URL`: The base URL for the application.
   - `HOME_URL`: The home URL for the application.

### Triggering the Pipeline

The pipeline is triggered on:
- Push events to the `main` branch.
- Pull requests targeting the `main` branch.

### Conclusion

This CI/CD pipeline setup ensures that your Playwright + k6 project is automatically tested and deployed whenever changes are made to the main branch. Adjust the deployment commands as necessary to fit your deployment strategy.