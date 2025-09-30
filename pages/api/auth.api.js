// @ts-check
const { expect } = require("@playwright/test");
const {
  baseUrl,
  validemail,
  validpassword,
  apiUrl,
} = require("../../utils/env");

/**
 * Auth API service class
 * Handles authentication related API requests
 */
class AuthAPI {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.apiUrl = apiUrl;
    this.endpoints = {
      login: "/api/v1/auth/login",
    };
  }

  /**
   * Login with provided credentials
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Response data
   */
  async login(email = validemail, password = validpassword) {
    const response = await this.request.post(
      `${this.apiUrl}${this.endpoints.login}`,
      {
        data: { email, password },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      status: response.status(),
      body: await response.json(),
      response,
    };
  }

  /**
   * Save API response to file
   * @param {Object} data - Response data to save
   * @param {string} filename - File name to save as
   */
  async saveResponse(data, filename) {
    const fs = require("fs");
    const path = require("path");

    const responseDir = path.join(process.cwd(), "tests/api/responses");
    if (!fs.existsSync(responseDir)) {
      fs.mkdirSync(responseDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(responseDir, filename),
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = { AuthAPI };
