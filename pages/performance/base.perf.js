/**
 * Base Performance Page Object
 * Provides common functionality for performance testing
 */
export class BasePerformance {
  /**
   * Constructor for the base performance page
   * @param {object} http - The k6 http client
   * @param {object} env - Environment variables
   */
  constructor(http, env = {}) {
    this.http = http;
    // Use localhost for testing to avoid external API dependencies
    this.baseUrl = env.BASE_URL || 'http://localhost:3000';
    this.apiUrl = env.API_URL || 'http://localhost:3000/api';
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    
    // Performance optimization settings
    this.requestTimeout = 5000; // 5 second timeout
    this.retryCount = 2; // Retry failed requests
    this.batchRequests = true; // Enable request batching when possible
  }

  /**
   * Make a GET request
   * @param {string} url - The URL to request
   * @param {object} params - Query parameters
   * @returns {object} - The response
   */
  get(url, params = {}) {
    return this.http.get(url, { params, headers: this.headers });
  }

  /**
   * Make a POST request with performance optimizations
   * @param {string} url - The URL to request
   * @param {object|string} payload - The request payload
   * @returns {object} - The response
   */
  post(url, payload) {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    
    // Apply performance optimizations
    const params = { 
      headers: this.headers,
      timeout: this.requestTimeout,
      tags: { name: url.split('/').pop() } // Add tags for better metrics
    };
    
    // Implement retry logic for failed requests
    let response;
    let retries = 0;
    
    while (retries <= this.retryCount) {
      response = this.http.post(url, body, params);
      
      // If successful or reached max retries, break
      if (this.isSuccessful(response) || retries === this.retryCount) {
        break;
      }
      
      retries++;
    }
    
    return response;
  }

  /**
   * Make a PUT request
   * @param {string} url - The URL to request
   * @param {object|string} payload - The request payload
   * @returns {object} - The response
   */
  put(url, payload) {
    const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return this.http.put(url, body, { headers: this.headers });
  }

  /**
   * Make a DELETE request
   * @param {string} url - The URL to request
   * @returns {object} - The response
   */
  delete(url) {
    return this.http.del(url, null, { headers: this.headers });
  }

  /**
   * Check if response is successful
   * @param {object} response - The HTTP response
   * @returns {boolean} - True if successful
   */
  isSuccessful(response) {
    return response.status >= 200 && response.status < 300;
  }
}

// ES modules export for k6 compatibility