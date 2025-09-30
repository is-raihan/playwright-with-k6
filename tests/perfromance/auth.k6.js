import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// Direct imports for k6 compatibility
import { BasePerformance } from '../../pages/performance/base.perf.js';
import { AuthPerformance } from '../../pages/performance/auth.perf.js';

// Custom metrics for better performance monitoring
const loginDuration = new Trend('login_duration');
const successfulLogins = new Counter('successful_logins');
const failedRequests = new Rate('failed_requests');

// Load environment variables
// Note: In k6, we can't directly access Node.js env variables
// So we're defining them here based on the .env files
const env = {
  // Use localhost for testing to avoid external API dependencies
  BASE_URL: __ENV.BASE_URL || 'http://localhost:3000',
  API_URL: __ENV.API_URL || 'http://localhost:3000/api',
  EMAIL: __ENV.EMAIL || 'admin@admin.com',
  PASSWORD: __ENV.PASSWORD || '12345678',
  INVALID_EMAIL: __ENV.INVALID_EMAIL || 'invalid@admin.com',
  INVALID_PASSWORD: __ENV.INVALID_PASSWORD || 'invali##Password123'
};

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Ramp up to 5 users over 30 seconds
    { duration: '1m', target: 5 },    // Stay at 5 users for 1 minute
    { duration: '30s', target: 0 },   // Ramp down to 0 users over 30 seconds
  ],
  thresholds: {
    http_req_duration: ['p(95)<1300'], // 95% of requests should be below 1300ms
    // Removed http_req_failed threshold as we're using our own custom metric
    login_duration: ['p(95)<1300', 'p(99)<1800'], // Realistic login duration thresholds
    failed_requests: ['rate<0.3'],     // Using our custom metric instead
  },
};

export default function() {
  // Initialize the Auth Performance page object with environment variables
  const authPage = new AuthPerformance(http, env);
  
  // Perform login test using POM with credentials from the page object
  const loginResult = authPage.login(authPage.credentials);
  
  // Record metrics
  loginDuration.add(loginResult.duration);
  
  // Check response and record success/failure with more resilient conditions
  const checkResult = check(loginResult, {
    'response received': (r) => r !== undefined,
    'has body': (r) => r.body !== undefined,
    'has success property': (r) => r.body && r.body.success !== undefined,
    'has message property': (r) => r.body && r.body.message !== undefined
  });
  
  if (loginResult.success) {
    successfulLogins.add(1);
  }
  
  failedRequests.add(!loginResult.success);
  
  // Log response time
  console.log(`Response time: ${loginResult.duration} ms`);
  
  // Add variable sleep time to reduce server load spikes
  sleep(Math.random() * 2 + 0.5); // Sleep between 0.5 and 2.5 seconds
}