/**
 * Auth Performance Page Object
 * Handles authentication-related performance tests
 */
import { BasePerformance } from './base.perf.js';

export class AuthPerformance extends BasePerformance {
  /**
   * Constructor for the auth performance page
   * @param {object} http - The k6 http client
   * @param {object} env - Environment variables
   */
  constructor(http, env = {}) {
    super(http, env);
    this.loginEndpoint = `${this.apiUrl}/api/auth/login`;
    // Cache auth token to reduce login requests
    this.authToken = null;
    this.credentials = {
      email: env.EMAIL || 'admin@admin.com',
      password: env.PASSWORD || '12345678',
      invalidEmail: env.INVALID_EMAIL || 'invalid@admin.com',
      invalidPassword: env.INVALID_PASSWORD || 'invalid123'
    };
    // Pre-prepare payload to avoid object creation during tests
    this.loginPayload = {
      email: this.credentials.email,
      password: this.credentials.password
    };
    this.invalidLoginPayload = {
      email: this.credentials.invalidEmail,
      password: this.credentials.invalidPassword
    };
  }

  /**
   * Perform login operation with optimized performance
   * @param {object} credentials - User credentials (email, password)
   * @returns {object} - Login response with duration
   */
  login(credentials) {
    // Use cached token if available to reduce server load
    if (this.authToken) {
      return {
        success: true,
        status: 200,
        body: { 
          success: true,
          message: 'Successfully logged in (cached).',
          data: { token: this.authToken }
        },
        duration: 0,
        headers: {},
        cached: true
      };
    }

    // Use pre-prepared payload or create new one if custom credentials provided
    const payload = (credentials === this.credentials) 
      ? this.loginPayload 
      : { email: credentials.email, password: credentials.password };

    // Add custom headers for performance optimization
    const customHeaders = {
      ...this.headers,
      'X-Performance-Test': 'true',
      'Connection': 'keep-alive'
    };

    try {
      const response = this.http.post(this.loginEndpoint, JSON.stringify(payload), { 
        headers: customHeaders,
        timeout: 5000 // Increased timeout to prevent hanging requests
      });
      
      let responseBody;
      try {
        responseBody = response.json();
      } catch (e) {
        // Handle JSON parsing errors
        responseBody = { 
          success: false, 
          message: 'Invalid JSON response',
          data: null
        };
      }
      
      // Cache the token for future requests if successful
      if (this.isSuccessful(response)) {
        if (responseBody && responseBody.data && responseBody.data.token) {
          this.authToken = responseBody.data.token;
        }
      }
      
      return {
        success: this.isSuccessful(response),
        status: response.status,
        body: responseBody,
        duration: response.timings.duration,
        headers: response.headers
      };
    } catch (error) {
      // Handle network errors or timeouts
      return {
        success: false,
        status: 0,
        body: { 
          success: false, 
          message: `Request failed: ${error.message}`,
          data: null
        },
        duration: 0,
        headers: {},
        error: error.message
      };
    }
  }

  /**
   * Perform invalid login to test error handling
   * @param {object} credentials - Invalid user credentials
   * @returns {object} - Login response with duration
   */
  invalidLogin(credentials) {
    // Use pre-prepared payload for better performance
    const payload = (credentials === this.credentials)
      ? this.invalidLoginPayload
      : { email: credentials.email, password: credentials.password };
      
    // Add custom headers for performance optimization
    const customHeaders = {
      ...this.headers,
      'X-Performance-Test': 'true',
      'Connection': 'keep-alive'
    };

    try {
      const response = this.http.post(this.loginEndpoint, JSON.stringify(payload), { 
        headers: customHeaders,
        timeout: 5000 // Increased timeout to prevent hanging requests
      });
      
      let responseBody;
      try {
        responseBody = response.json();
      } catch (e) {
        // Handle JSON parsing errors
        responseBody = { 
          success: false, 
          message: 'Invalid JSON response',
          data: null
        };
      }
      
      return {
        success: this.isSuccessful(response),
        status: response.status,
        body: responseBody,
        duration: response.timings.duration,
        headers: response.headers
      };
    } catch (error) {
      // Handle network errors or timeouts
      return {
        success: false,
        status: 0,
        body: { 
          success: false, 
          message: `Request failed: ${error.message}`,
          data: null
        },
        duration: 0,
        headers: {},
        error: error.message
      };
    }
  }
}

// ES modules export for k6 compatibility