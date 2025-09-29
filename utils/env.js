const { config } = require('dotenv');
const { resolve } = require('path');

const env = process.env.NODE_ENV || 'dev';
config({ path: resolve(__dirname, `../env/.env.${env}`) });

const baseUrl = process.env.BASE_URL || 'https://dev.pippasync.customeradmin.boostonamazon.com';
const validemail = process.env.EMAIL || 'admin@admin.com';
const validpassword = process.env.PASSWORD || '12345678';
const invalidemail = process.env.INVALID_EMAIL || 'invalid@admin.com';
const invalidpassword = process.env.INVALID_PASSWORD || 'invali##Password123';

module.exports = {
  baseUrl,
  validemail,
  validpassword,
  invalidemail,
  invalidpassword,
};
