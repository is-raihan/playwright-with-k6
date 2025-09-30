/**
 * Fixture Loader Utility
 * Loads test data from fixture files based on environment
 */
const fs = require('fs');
const path = require('path');
const { env } = require('./env');

/**
 * Load fixture data based on current environment
 * @param {string} fixtureName - Name of the fixture file without extension
 * @returns {object} - Fixture data
 */
function loadFixture(fixtureName) {
  const environment = env.NODE_ENV || 'dev';
  const fixturePath = path.resolve(__dirname, '../fixtures', `${environment}.json`);
  
  try {
    const fixtureData = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
    return fixtureName ? fixtureData[fixtureName] : fixtureData;
  } catch (error) {
    console.error(`Error loading fixture: ${error.message}`);
    return {};
  }
}

module.exports = { loadFixture };