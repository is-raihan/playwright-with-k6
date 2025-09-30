// Environment configuration for K6 tests
// Values imported from .env.dev
export const devEnv = {
  BASE_URL: 'https://dev.pippasync.customeradmin.boostonamazon.com',
  API_URL: 'https://dev.pippasync.customeradmin.boostonamazon.com/api',
  EMAIL: 'admin@admin.com',
  PASSWORD: '12345678',
  INVALID_EMAIL: 'invalid@admin.com',
  INVALID_PASSWORD: 'invali##Password123'
};