# TGN Website Test Execution Guide

## Overview
This guide provides step-by-step instructions for executing automated tests on the TGN (The Gypsy Nurse) website using Chrome DevTools MCP (Model Context Protocol).

## Prerequisites

### 1. Environment Setup
- Chrome browser with DevTools MCP integration
- Node.js (for running test scripts)
- Access to the TGN staging environment
- Git repository access (if applicable)

### 2. Required Tools
- Chrome DevTools MCP Server
- Playwright browser automation
- Test data and configurations

## Test Execution Methods

### Method 1: Interactive MCP Testing
This method uses the MCP tools directly in a conversational interface.

#### Step 1: Initialize Browser Session
```javascript
// Navigate to the TGN website
await mcp_cursor_playwright_browser_navigate({
    url: 'http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/'
});
```

#### Step 2: Execute Test Cases
Use the MCP tools to perform specific test actions:

**Homepage Navigation Test:**
```javascript
// Take initial screenshot
await mcp_cursor_playwright_browser_take_screenshot({
    filename: 'homepage_initial.png',
    fullPage: true
});

// Test navigation elements
await mcp_cursor_playwright_browser_click({
    element: 'Search Jobs link',
    ref: 'e13'
});
```

**Job Search Test:**
```javascript
// Navigate to jobs page
await mcp_cursor_playwright_browser_click({
    element: 'Search Jobs link',
    ref: 'e13'
});

// Perform search
await mcp_cursor_playwright_browser_type({
    element: 'Search textbox',
    ref: 'e530',
    text: 'ICU'
});

// Test sorting
await mcp_cursor_playwright_browser_select_option({
    element: 'Sort dropdown',
    ref: 'e546',
    values: ['💰 Salary: High to Low']
});
```

### Method 2: Automated Script Execution
This method runs predefined test scripts automatically.

#### Step 1: Prepare Test Environment
```bash
# Navigate to test directory
cd /Users/inx-admin/Documents/TGN_MCP_TC/

# Install dependencies (if needed)
npm install playwright

# Set up test configuration
export TEST_BASE_URL="http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/"
```

#### Step 2: Execute Test Scripts
```bash
# Run all tests
node automated_test_scripts.js

# Run specific test suite
node -e "const tests = require('./automated_test_scripts.js'); tests.testHomepageNavigation();"
```

## Test Case Execution

### 1. Homepage Tests
**Objective**: Verify homepage loads correctly with all elements

**Execution Steps**:
1. Navigate to base URL
2. Wait for page load (3 seconds)
3. Take full-page screenshot
4. Verify navigation elements
5. Test hero section search form
6. Verify featured content sections

**Expected Results**:
- Page loads within 5 seconds
- All navigation elements are present
- Hero section is visible
- Featured jobs and events are displayed

### 2. Job Search Tests
**Objective**: Test job search and filtering functionality

**Execution Steps**:
1. Click "Search Jobs" navigation link
2. Wait for jobs page to load
3. Enter search term "ICU"
4. Test sorting options
5. Click on job details
6. Test job application process

**Expected Results**:
- Jobs page loads with search interface
- Search returns relevant results
- Sorting works correctly
- Job details display properly

### 3. Navigation Menu Tests
**Objective**: Test dropdown menus and navigation

**Execution Steps**:
1. Click "Resources" dropdown
2. Select "Blog" option
3. Verify blog page loads
4. Test "Events" dropdown
5. Select "Event Calendar"
6. Verify event calendar page

**Expected Results**:
- Dropdown menus open correctly
- Navigation to sub-pages works
- All menu options are functional

### 4. User Registration Tests
**Objective**: Test user registration process

**Execution Steps**:
1. Click "Join Gypsy Nurse" link
2. Fill registration form with test data
3. Test form validation
4. Test password visibility toggles
5. Submit registration form

**Expected Results**:
- Registration page loads correctly
- Form fields accept input
- Validation works properly
- Form submission processes

### 5. Newsletter Subscription Tests
**Objective**: Test newsletter subscription functionality

**Execution Steps**:
1. Navigate to homepage
2. Scroll to newsletter section
3. Fill subscription form
4. Test form submission
5. Verify success message

**Expected Results**:
- Newsletter form is accessible
- Form accepts valid input
- Submission processes correctly

## Test Data Management

### Test User Credentials
```javascript
const testUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    password: 'TestPassword123',
    mobile: '5551234567'
};
```

### Search Test Data
```javascript
const searchTerms = [
    'ICU',
    'Nurse',
    'Travel',
    'RN',
    'Emergency',
    'Surgery'
];
```

### Form Test Data
```javascript
const formData = {
    newsletter: {
        firstName: 'Newsletter',
        lastName: 'Test',
        email: 'newsletter@example.com'
    },
    contact: {
        name: 'Contact Test',
        email: 'contact@example.com',
        message: 'This is a test message'
    }
};
```

## Screenshot Documentation

### Required Screenshots
1. **Homepage Initial Load** - `homepage_initial.png`
2. **Job Search Results** - `job_search_results.png`
3. **Job Details Page** - `job_details_page.png`
4. **Blog Page** - `blog_page.png`
5. **Registration Form** - `registration_form_filled.png`
6. **Newsletter Form** - `newsletter_form_filled.png`
7. **Mobile Viewport** - `mobile_viewport.png`
8. **Tablet Viewport** - `tablet_viewport.png`
9. **Desktop Viewport** - `desktop_viewport.png`

### Screenshot Naming Convention
- Use descriptive names
- Include test case identifier
- Include timestamp if needed
- Use PNG format for quality

## Error Handling and Debugging

### Common Issues and Solutions

#### 1. Element Not Found Errors
**Issue**: MCP tools cannot find page elements
**Solution**: 
- Wait for page to fully load
- Use dynamic element references
- Check for element visibility

#### 2. Timeout Errors
**Issue**: Actions timeout before completion
**Solution**:
- Increase wait times
- Check network connectivity
- Verify page load status

#### 3. Navigation Errors
**Issue**: Page navigation fails
**Solution**:
- Verify URL correctness
- Check for redirects
- Ensure page accessibility

### Debugging Techniques

#### Console Monitoring
```javascript
// Get console messages
const consoleMessages = await mcp_cursor_playwright_browser_console_messages();
console.log('Console Messages:', consoleMessages);
```

#### Network Request Monitoring
```javascript
// Get network requests
const networkRequests = await mcp_cursor_playwright_browser_network_requests();
console.log('Network Requests:', networkRequests);
```

#### Performance Monitoring
```javascript
// Get performance metrics
const performance = await mcp_cursor_playwright_browser_evaluate({
    function: '() => performance.timing'
});
console.log('Performance:', performance);
```

## Test Reporting

### Test Results Structure
```javascript
const testResult = {
    testCase: 'TC-001',
    name: 'Homepage Navigation',
    status: 'PASSED', // or 'FAILED'
    duration: '2.5s',
    screenshots: ['homepage_initial.png'],
    errors: [],
    consoleMessages: [],
    performance: {
        loadTime: 1500,
        domContentLoaded: 800
    }
};
```

### Report Generation
```javascript
function generateTestReport(results) {
    const report = {
        summary: {
            totalTests: results.length,
            passed: results.filter(r => r.status === 'PASSED').length,
            failed: results.filter(r => r.status === 'FAILED').length,
            successRate: 0
        },
        details: results,
        timestamp: new Date().toISOString()
    };
    
    report.summary.successRate = (report.summary.passed / report.summary.totalTests) * 100;
    return report;
}
```

## Continuous Integration

### Automated Test Execution
```bash
#!/bin/bash
# CI Test Script

echo "Starting TGN Website Tests..."

# Set environment variables
export TEST_BASE_URL="http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/"
export TEST_TIMEOUT=30000

# Run tests
node automated_test_scripts.js > test_results.log 2>&1

# Check results
if [ $? -eq 0 ]; then
    echo "✅ All tests passed"
    exit 0
else
    echo "❌ Some tests failed"
    exit 1
fi
```

### Test Scheduling
```yaml
# GitHub Actions example
name: TGN Website Tests
on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: node automated_test_scripts.js
```

## Best Practices

### 1. Test Organization
- Group related tests together
- Use descriptive test names
- Maintain test data separately
- Document test dependencies

### 2. Error Handling
- Implement proper error catching
- Log detailed error information
- Provide meaningful error messages
- Handle network timeouts gracefully

### 3. Performance Considerations
- Use appropriate wait times
- Minimize unnecessary actions
- Optimize screenshot capture
- Monitor resource usage

### 4. Maintenance
- Update test data regularly
- Review and update test cases
- Maintain test documentation
- Monitor test execution times

## Troubleshooting

### Common Problems

#### 1. Browser Not Starting
- Check Chrome installation
- Verify MCP server connection
- Check system permissions

#### 2. Tests Timing Out
- Increase timeout values
- Check network connectivity
- Verify page load status

#### 3. Element Selection Issues
- Use more specific selectors
- Wait for elements to be visible
- Check for dynamic content loading

### Support Resources
- Chrome DevTools MCP Documentation
- Playwright Documentation
- TGN Website Documentation
- Test Team Contact Information

## Conclusion

This guide provides comprehensive instructions for executing automated tests on the TGN website using Chrome DevTools MCP. Follow the steps carefully and refer to the troubleshooting section for common issues. Regular test execution ensures the website maintains high quality and functionality.
