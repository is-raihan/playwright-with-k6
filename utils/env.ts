import { config } from 'dotenv';
import { resolve } from 'path';

const env = process.env.NODE_ENV || 'dev';
// const env = process.env.NODE_ENV || 'stage';
// const env = process.env.NODE_ENV || 'prod';
config({ path: resolve(__dirname, `../env/.env.${env}`) });

export const baseUrl = process.env.BASE_URL || 'https://dev.pippasync.customeradmin.boostonamazon.com';
export const validemail = process.env.EMAIL || 'admin@admin.com';
export const validpassword = process.env.PASSWORD || '12345678';
export const invalidemail = process.env.INVALID_EMAIL || 'invalid@admin.com';
export const invalidpassword = process.env.INVALID_PASSWORD || 'invali##Password123';

// export const baseUrl = process.env.BASE_URL;
// export const validemail = process.env.EMAIL;
// export const validpassword = process.env.PASSWORD;
// export const invalidemail = process.env.INVALID_EMAIL;
// export const invalidpassword = process.env.INVALID_PASSWORD;