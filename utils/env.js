import dotenv from 'dotenv';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: path.resolve(__dirname, '../env', envFile) });

export const BASE_URL = process.env.BASE_URL || 'https://www.youtube.com/';
export const HOME_URL = process.env.HOME_URL || 'https://www.youtube.com/';

const testDataPath = path.resolve(__dirname, `../fixtures/${process.env.NODE_ENV || 'dev'}.json`);
export const TEST_DATA = JSON.parse(fs.readFileSync(testDataPath, 'utf-8')); 