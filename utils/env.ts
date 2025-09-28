import { config } from 'dotenv';
import { resolve } from 'path';

const env = process.env.NODE_ENV || 'dev';
config({ path: resolve(__dirname, `../env/.env.${env}`) });

function requireString(name: string): string {
  const val = process.env[name];
  if (!val || typeof val !== 'string' || val.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}. Ensure env/.env.${env} defines ${name}.`);
  }
  return val;
}

// Normalize base URL to have no trailing slash for consistent path joining
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, '');
}

export const baseUrl: string = normalizeBaseUrl(requireString('BASE_URL'));
export const validemail: string = requireString('EMAIL');
export const validpassword: string = requireString('PASSWORD');
export const invalidemail: string = requireString('INVALID_EMAIL');
export const invalidpassword: string = requireString('INVALID_PASSWORD');