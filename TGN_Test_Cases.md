# TGN (The Gypsy Nurse) Website Test Cases

## Overview
This document contains comprehensive test cases for the TGN web portal (http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/) using Chrome DevTools MCP for automated testing.

## Test Environment Setup
- **Browser**: Chrome with DevTools MCP integration
- **Testing Tool**: Playwright with MCP (Model Context Protocol)
- **Base URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/
- **Test Date**: January 2025

---

## 1. Homepage Navigation Tests

### TC-001: Homepage Load and Basic Elements
**Objective**: Verify homepage loads correctly with all essential elements
**Steps**:
1. Navigate to the base URL
2. Verify page title is "The Gypsy Nurse"
3. Verify main navigation elements are present:
   - The Gypsy Nurse logo (clickable)
   - Search Jobs link
   - Resources dropdown
   - Events dropdown
   - For Employers dropdown
   - Log in button
   - Join Gypsy Nurse link
4. Verify hero section with job search form
5. Verify featured jobs section
6. Verify featured events section
7. Verify Instagram feed section
8. Verify resources section
9. Verify blog section
10. Verify newsletter subscription form
11. Verify footer with social links

**Expected Result**: All elements load correctly and are functional

### TC-002: Navigation Logo Functionality
**Objective**: Test logo click returns to homepage
**Steps**:
1. Navigate to any page (e.g., /jobs)
2. Click on "The Gypsy Nurse" logo
3. Verify redirect to homepage

**Expected Result**: Successfully returns to homepage

---

## 2. Job Search and Listing Tests

### TC-003: Job Search Page Navigation
**Objective**: Test navigation to job search page
**Steps**:
1. Click on "Search Jobs" link in navigation
2. Verify URL changes to /jobs
3. Verify page loads with job search interface

**Expected Result**: Job search page loads with search functionality

### TC-004: Job Search Functionality
**Objective**: Test job search with keywords
**Steps**:
1. Navigate to /jobs page
2. Enter search term "ICU" in search box
3. Verify search results update
4. Test with different search terms

**Expected Result**: Search returns relevant job results

### TC-005: Job Sorting Functionality
**Objective**: Test job sorting options
**Steps**:
1. Navigate to /jobs page
2. Click on sort dropdown
3. Select "Salary: High to Low"
4. Verify jobs are sorted by salary
5. Test other sorting options:
   - Salary: Low to High
   - Date: Newest First
   - Date: Oldest First
   - Title: A-Z
   - Title: Z-A
   - Facility: A-Z
   - Facility: Z-A

**Expected Result**: Jobs are sorted according to selected criteria

### TC-006: Job Details View
**Objective**: Test viewing individual job details
**Steps**:
1. Navigate to /jobs page
2. Click on "View Details" for any job
3. Verify job details page loads
4. Verify job information is displayed:
   - Job title
   - Facility information
   - Location
   - Salary
   - Shift details
   - Job description
   - Apply Now button
   - Bookmark button
   - Share Job button

**Expected Result**: Job details page displays complete information

### TC-007: Job Application Process
**Objective**: Test job application functionality
**Steps**:
1. Navigate to a job details page
2. Click "Apply Now" button
3. Verify application process initiates

**Expected Result**: Application process starts (may redirect to external site)

### TC-008: Job Like/Dislike Functionality
**Objective**: Test job preference buttons
**Steps**:
1. Navigate to /jobs page
2. Click "Like" button on a job
3. Click "Dislike" button on a job
4. Verify buttons respond to clicks

**Expected Result**: Like/Dislike buttons are functional

---

## 3. Events Section Tests

### TC-009: Events Navigation
**Objective**: Test events dropdown navigation
**Steps**:
1. Click on "Events" button in navigation
2. Verify dropdown menu appears with options:
   - Event Calendar
   - Event Recaps
   - Submit an Event
   - TravCon
3. Click on "Event Calendar"
4. Verify navigation to /events/calendar

**Expected Result**: Events dropdown works and navigates correctly

### TC-010: Event Calendar Page
**Objective**: Test event calendar page
**Steps**:
1. Navigate to /events/calendar
2. Verify page loads with "Event Calendar" heading
3. Verify "Coming Soon" message is displayed

**Expected Result**: Event calendar page loads with appropriate messaging

### TC-011: Featured Events on Homepage
**Objective**: Test featured events section
**Steps**:
1. Navigate to homepage
2. Verify featured events section displays:
   - TravCon 2025 (Sept 21, 2025, Las Vegas, NV)
   - Nursing Conference 2025 (Oct 15, 2025, Chicago, IL)
   - Healthcare Summit 2025 (Nov 30, 2025, Miami, FL)
3. Click "View All Events" buttons

**Expected Result**: Featured events display correctly with proper dates and locations

---

## 4. Resources Section Tests

### TC-012: Resources Navigation
**Objective**: Test resources dropdown navigation
**Steps**:
1. Click on "Resources" button in navigation
2. Verify dropdown menu appears with options:
   - Blog
   - Compact License
   - Continuing Education
   - Discounts
   - FAQs
   - Hospital Directory
   - Housing
   - Mentors
   - Nursing Boards
   - Podcast
   - Travel Nurse 101
   - Agencies
   - Professionals
3. Click on "Blog"
4. Verify navigation to /blogs

**Expected Result**: Resources dropdown works and navigates correctly

### TC-013: Blog Page Functionality
**Objective**: Test blog page features
**Steps**:
1. Navigate to /blogs page
2. Verify page loads with "Our Blog" heading
3. Verify search functionality for blogs
4. Verify blog articles are displayed with:
   - Featured images
   - Article titles
   - Author information
   - Publication dates
   - Category tags
   - "Read More" links
5. Test blog search functionality
6. Test "Clear Filters" button

**Expected Result**: Blog page loads with all articles and search functionality

### TC-014: Resources Section on Homepage
**Objective**: Test resources section buttons
**Steps**:
1. Navigate to homepage
2. Verify resources section displays:
   - Compact License button
   - Continuing Education button
   - FAQs button
   - Housing button
3. Click on each button to test functionality

**Expected Result**: Resource buttons are clickable and functional

---

## 5. User Registration and Authentication Tests

### TC-015: Registration Page Navigation
**Objective**: Test registration page access
**Steps**:
1. Click on "Join Gypsy Nurse" link
2. Verify navigation to /register page
3. Verify registration form is displayed

**Expected Result**: Registration page loads with form

### TC-016: Registration Form Validation
**Objective**: Test registration form fields
**Steps**:
1. Navigate to /register page
2. Verify form fields are present:
   - First Name (required)
   - Last Name (required)
   - Mobile Number
   - Email (required)
   - Password (required)
   - Confirm Password (required)
3. Test form validation by submitting empty form
4. Test password visibility toggles
5. Test form submission with valid data

**Expected Result**: Form validation works and all fields are functional

### TC-017: Login Functionality
**Objective**: Test login button and process
**Steps**:
1. Click on "Log in" button in navigation
2. Verify login interface appears
3. Test login form functionality

**Expected Result**: Login interface is accessible and functional

---

## 6. Newsletter Subscription Tests

### TC-018: Newsletter Subscription Form
**Objective**: Test newsletter subscription on homepage
**Steps**:
1. Navigate to homepage
2. Scroll to newsletter subscription section
3. Fill out form fields:
   - First Name
   - Last Name
   - Email Address
   - Select Profession (dropdown)
   - Select Specialties
4. Verify checkbox "I would like to receive emails from The Gypsy Nurse!" is checked by default
5. Click "Subscribe" button

**Expected Result**: Newsletter subscription form is functional

---

## 7. Blog and Content Tests

### TC-019: Blog Article Reading
**Objective**: Test blog article access and reading
**Steps**:
1. Navigate to /blogs page
2. Click on "Read More" for any blog article
3. Verify article page loads with full content
4. Verify article elements:
   - Title
   - Author
   - Publication date
   - Content
   - Images

**Expected Result**: Blog articles load with complete content

### TC-020: Blog Search Functionality
**Objective**: Test blog search feature
**Steps**:
1. Navigate to /blogs page
2. Use search box to search for specific terms
3. Verify search results update
4. Test "Clear Filters" functionality

**Expected Result**: Blog search works correctly

---

## 8. Social Media and External Links Tests

### TC-021: Social Media Links
**Objective**: Test social media links in footer
**Steps**:
1. Navigate to homepage
2. Scroll to footer section
3. Test social media links:
   - Facebook
   - X (Twitter)
   - Instagram
   - Pinterest
   - LinkedIn
   - YouTube
4. Verify links open in new tabs/windows

**Expected Result**: All social media links are functional

### TC-022: Footer Navigation Links
**Objective**: Test footer navigation links
**Steps**:
1. Navigate to homepage
2. Scroll to footer
3. Test footer links:
   - About Us
   - Blog
   - Contact Us
   - Events
   - Find a Job
   - Member Benefits
   - Resources
   - Submit Reviews
4. Verify each link navigates correctly

**Expected Result**: All footer links work correctly

---

## 9. Mobile Responsiveness Tests

### TC-023: Mobile Viewport Testing
**Objective**: Test website responsiveness on mobile devices
**Steps**:
1. Resize browser window to mobile dimensions (375px width)
2. Verify all elements are properly displayed
3. Test navigation menu functionality
4. Test form interactions
5. Test job search functionality

**Expected Result**: Website is responsive and functional on mobile devices

---

## 10. Performance and Loading Tests

### TC-024: Page Load Performance
**Objective**: Test page loading performance
**Steps**:
1. Navigate to homepage
2. Monitor console for any errors
3. Check for slow-loading resources
4. Test navigation between pages
5. Monitor network requests

**Expected Result**: Pages load quickly with minimal errors

### TC-025: Image Loading Tests
**Objective**: Test image loading and fallbacks
**Steps**:
1. Navigate through different pages
2. Verify all images load correctly
3. Check for broken image placeholders
4. Test Instagram feed images
5. Test blog article images

**Expected Result**: All images load correctly with proper fallbacks

---

## 11. Search Functionality Tests

### TC-026: Homepage Job Search
**Objective**: Test job search from homepage
**Steps**:
1. Navigate to homepage
2. Use hero section search form:
   - Enter job title in "What job are you looking for?" field
   - Enter location in "Where do you want to work?" field
3. Click search button
4. Verify search results

**Expected Result**: Homepage search functionality works

### TC-027: Advanced Job Filters
**Objective**: Test advanced job filtering
**Steps**:
1. Navigate to /jobs page
2. Click "Advanced Filters" button
3. Test filter options
4. Click "Reset" button
5. Verify filters reset

**Expected Result**: Advanced filters work correctly

---

## 12. Error Handling Tests

### TC-028: 404 Error Handling
**Objective**: Test 404 error handling
**Steps**:
1. Navigate to non-existent page (e.g., /nonexistent)
2. Verify appropriate error handling
3. Test navigation back to valid pages

**Expected Result**: 404 errors are handled gracefully

### TC-029: Network Error Handling
**Objective**: Test network error scenarios
**Steps**:
1. Simulate network issues
2. Test page loading with slow connections
3. Verify error messages are user-friendly

**Expected Result**: Network errors are handled appropriately

---

## 13. Accessibility Tests

### TC-030: Keyboard Navigation
**Objective**: Test keyboard accessibility
**Steps**:
1. Navigate using only keyboard (Tab, Enter, Arrow keys)
2. Test all interactive elements
3. Verify focus indicators are visible
4. Test form navigation

**Expected Result**: All functionality is accessible via keyboard

### TC-031: Screen Reader Compatibility
**Objective**: Test screen reader compatibility
**Steps**:
1. Use screen reader to navigate site
2. Verify all content is readable
3. Test form labels and descriptions
4. Verify navigation structure

**Expected Result**: Site is compatible with screen readers

---

## 14. Cross-Browser Compatibility Tests

### TC-032: Chrome Compatibility
**Objective**: Test functionality in Chrome browser
**Steps**:
1. Test all major functionality in Chrome
2. Verify JavaScript execution
3. Test CSS rendering
4. Verify responsive design

**Expected Result**: All functionality works in Chrome

### TC-033: Firefox Compatibility
**Objective**: Test functionality in Firefox browser
**Steps**:
1. Test all major functionality in Firefox
2. Verify JavaScript execution
3. Test CSS rendering
4. Verify responsive design

**Expected Result**: All functionality works in Firefox

### TC-034: Safari Compatibility
**Objective**: Test functionality in Safari browser
**Steps**:
1. Test all major functionality in Safari
2. Verify JavaScript execution
3. Test CSS rendering
4. Verify responsive design

**Expected Result**: All functionality works in Safari

---

## 15. Security Tests

### TC-035: Form Security
**Objective**: Test form security measures
**Steps**:
1. Test registration form for XSS vulnerabilities
2. Test login form security
3. Test newsletter subscription security
4. Verify HTTPS implementation

**Expected Result**: Forms are secure against common attacks

### TC-036: Data Validation
**Objective**: Test input validation
**Steps**:
1. Test form inputs with malicious data
2. Test SQL injection attempts
3. Test script injection attempts
4. Verify proper validation and sanitization

**Expected Result**: All inputs are properly validated and sanitized

---

## Test Execution Summary

### Automated Test Scripts
The following test scripts can be created using Chrome DevTools MCP:

1. **Homepage Load Test**: Automated navigation and element verification
2. **Job Search Test**: Automated search functionality testing
3. **Navigation Test**: Automated menu and link testing
4. **Form Submission Test**: Automated form filling and submission
5. **Responsive Design Test**: Automated viewport testing
6. **Performance Test**: Automated loading time measurement

### Test Data Requirements
- Valid email addresses for testing
- Test user credentials
- Sample job search terms
- Test form data

### Reporting
- Screenshots of test execution
- Console log analysis
- Performance metrics
- Error tracking and reporting

---

## Conclusion

This comprehensive test suite covers all major functionality of the TGN website, including navigation, job search, user registration, content management, and cross-browser compatibility. The tests are designed to be executed using Chrome DevTools MCP for automated testing, providing efficient and thorough coverage of the website's functionality.

Each test case includes clear objectives, step-by-step instructions, and expected results, making them suitable for both manual and automated execution. The test cases are organized by functional area to facilitate systematic testing and reporting.
