// K6 report handler for Ortoni integration
import { open } from 'k6/experimental/browser';

// Function to generate JSON report compatible with Ortoni
export function generateOrtoniReport(data) {
  const report = {
    title: "K6 Performance Test Results",
    timestamp: new Date().toISOString(),
    metrics: {
      http_req_duration: data.metrics.http_req_duration || {},
      login_duration: data.metrics.login_duration || {},
      failed_requests: data.metrics.failed_requests || {},
      successful_logins: data.metrics.successful_logins || {}
    },
    checks: data.checks || {},
    thresholds: data.thresholds || {}
  };
  
  return JSON.stringify(report, null, 2);
}

// Function to save report to file
export function saveReport(reportData, outputPath = 'k6-results/report.json') {
  try {
    const fs = require('fs');
    const dir = outputPath.substring(0, outputPath.lastIndexOf('/'));
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write report to file
    fs.writeFileSync(outputPath, reportData);
    console.log(`Report saved to ${outputPath}`);
  } catch (error) {
    console.error(`Failed to save report: ${error.message}`);
  }
}