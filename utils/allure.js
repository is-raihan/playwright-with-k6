import { allure } from 'allure-playwright';

/**
 * Allure reporting utilities for enhanced test reporting
 */
export class AllureHelper {
  /**
   * Add test step with description
   * @param {string} name - Step name
   * @param {Function} stepFn - Step function
   */
  static async step(name, stepFn) {
    return await allure.step(name, stepFn);
  }

  /**
   * Add attachment to test
   * @param {string} name - Attachment name
   * @param {Buffer|string} content - Attachment content
   * @param {string} type - MIME type
   */
  static async attachment(name, content, type = 'text/plain') {
    return await allure.attachment(name, content, type);
  }

  /**
   * Add screenshot attachment
   * @param {string} name - Screenshot name
   * @param {Buffer} screenshot - Screenshot buffer
   */
  static async screenshot(name, screenshot) {
    return await allure.attachment(name, screenshot, 'image/png');
  }

  /**
   * Add test description
   * @param {string} description - Test description
   */
  static description(description) {
    allure.description(description);
  }

  /**
   * Add test label
   * @param {string} name - Label name
   * @param {string} value - Label value
   */
  static label(name, value) {
    allure.label(name, value);
  }

  /**
   * Add test parameter
   * @param {string} name - Parameter name
   * @param {string} value - Parameter value
   */
  static parameter(name, value) {
    allure.parameter(name, value);
  }

  /**
   * Add test link
   * @param {string} url - Link URL
   * @param {string} name - Link name
   * @param {string} type - Link type
   */
  static link(url, name, type = 'custom') {
    allure.link(url, name, type);
  }

  /**
   * Add test owner
   * @param {string} owner - Test owner
   */
  static owner(owner) {
    allure.owner(owner);
  }

  /**
   * Add test severity
   * @param {string} severity - Test severity (blocker, critical, normal, minor, trivial)
   */
  static severity(severity) {
    allure.severity(severity);
  }

  /**
   * Add test story
   * @param {string} story - Test story
   */
  static story(story) {
    allure.story(story);
  }

  /**
   * Add test feature
   * @param {string} feature - Test feature
   */
  static feature(feature) {
    allure.feature(feature);
  }

  /**
   * Add test epic
   * @param {string} epic - Test epic
   */
  static epic(epic) {
    allure.epic(epic);
  }

  /**
   * Add test suite
   * @param {string} suite - Test suite
   */
  static suite(suite) {
    allure.suite(suite);
  }

  /**
   * Add test parent suite
   * @param {string} parentSuite - Parent suite
   */
  static parentSuite(parentSuite) {
    allure.parentSuite(parentSuite);
  }

  /**
   * Add test sub suite
   * @param {string} subSuite - Sub suite
   */
  static subSuite(subSuite) {
    allure.subSuite(subSuite);
  }

  /**
   * Add test tag
   * @param {string} tag - Test tag
   */
  static tag(tag) {
    allure.tag(tag);
  }

  /**
   * Add test issue link
   * @param {string} issue - Issue ID
   * @param {string} name - Issue name
   */
  static issue(issue, name) {
    allure.issue(issue, name);
  }

  /**
   * Add test TMS link
   * @param {string} tms - TMS ID
   * @param {string} name - TMS name
   */
  static tms(tms, name) {
    allure.tms(tms, name);
  }

  /**
   * Add test start time
   * @param {Date} startTime - Test start time
   */
  static startTime(startTime) {
    allure.startTime(startTime);
  }

  /**
   * Add test stop time
   * @param {Date} stopTime - Test stop time
   */
  static stopTime(stopTime) {
    allure.stopTime(stopTime);
  }

  /**
   * Add test history ID
   * @param {string} historyId - History ID
   */
  static historyId(historyId) {
    allure.historyId(historyId);
  }

  /**
   * Add test ID
   * @param {string} testId - Test ID
   */
  static testId(testId) {
    allure.testId(testId);
  }

  /**
   * Add test case ID
   * @param {string} testCaseId - Test case ID
   */
  static testCaseId(testCaseId) {
    allure.testCaseId(testCaseId);
  }

  /**
   * Add test method
   * @param {string} method - Test method
   */
  static testMethod(method) {
    allure.testMethod(method);
  }

  /**
   * Add test class
   * @param {string} testClass - Test class
   */
  static testClass(testClass) {
    allure.testClass(testClass);
  }

  /**
   * Add test package
   * @param {string} testPackage - Test package
   */
  static testPackage(testPackage) {
    allure.testPackage(testPackage);
  }

  /**
   * Add test host
   * @param {string} host - Test host
   */
  static host(host) {
    allure.host(host);
  }

  /**
   * Add test thread
   * @param {string} thread - Test thread
   */
  static thread(thread) {
    allure.thread(thread);
  }
}
