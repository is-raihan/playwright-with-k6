// Allure configuration for enhanced reporting
export default {
  // Allure results directory
  resultsDir: 'allure-results',
  
  // Report generation settings
  reportDir: 'allure-report',
  
  // Environment information
  environment: {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    BASE_URL: process.env.BASE_URL || 'https://www.youtube.com/',
    HOME_URL: process.env.HOME_URL || 'https://www.youtube.com/',
    Browser: 'Chromium',
    OS: process.platform,
    Node: process.version,
  },
  
  // Categories for test classification
  categories: [
    {
      name: 'Test Severity',
      matchedStatuses: ['failed', 'broken'],
      messageRegex: '.*severity.*',
    },
    {
      name: 'Product Defects',
      matchedStatuses: ['failed'],
      messageRegex: '.*product.*',
    },
    {
      name: 'Test Defects',
      matchedStatuses: ['broken'],
      messageRegex: '.*test.*',
    },
  ],
  
  // Test execution settings
  execution: {
    type: 'playwright',
    buildName: process.env.BUILD_NAME || `Build-${new Date().toISOString().split('T')[0]}`,
    buildUrl: process.env.BUILD_URL || '',
  },
};
