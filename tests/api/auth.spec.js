// @ts-check
const { test, expect } = require('@playwright/test');
const { AuthAPI } = require('../../pages/api/auth.api');
const { validemail, validpassword } = require('../../utils/env');

test.describe('Authentication API Tests', () => {
  let authAPI;

  test.beforeEach(({ request }) => {
    authAPI = new AuthAPI(request);
  });

  test('Login API response test', async () => {
    // Use the POM to make the login request
    const { status, body } = await authAPI.login(validemail, validpassword);
    
    // Log response status and body for debugging
    console.log(`Status: ${status}`);
    console.log('Response body:', body);

    // Assert response contains expected structure
    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('message');
    
    // Save response to a file for reference
    await authAPI.saveResponse(body, 'login-response.json');
  });
});