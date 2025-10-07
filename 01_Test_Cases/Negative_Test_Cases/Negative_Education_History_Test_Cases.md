# TGN Website Negative Education History Test Cases

## Test Suite Overview
**Test Suite**: Education History Management - Negative Scenarios  
**Total Test Cases**: 8 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-EDU-NEG-001: Empty School Name**
**Test ID**: TC-EDU-NEG-001  
**Priority**: High  
**Description**: Attempt to add an education history entry without selecting a school.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Leave School Name field empty.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Enter "2022-05-15" into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "School name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-002: Empty Course of Study**
**Test ID**: TC-EDU-NEG-002  
**Priority**: High  
**Description**: Attempt to add an education history entry without selecting a course of study.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Leave Course of Study dropdown empty.
3. Check "Did you Graduate?" checkbox.
4. Enter "2022-05-15" into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "Course of study is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-003: Empty Graduation Date (when graduated)**
**Test ID**: TC-EDU-NEG-003  
**Priority**: High  
**Description**: Attempt to add an education history entry without entering a graduation date when "Did you Graduate?" is checked.  
**Preconditions**: Add New Education History pop-up is open, "Did you Graduate?" checkbox is checked.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Leave Graduation Date field empty.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "Graduation date is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-004: Empty Degree (when graduated)**
**Test ID**: TC-EDU-NEG-004  
**Priority**: High  
**Description**: Attempt to add an education history entry without selecting a degree when "Did you Graduate?" is checked.  
**Preconditions**: Add New Education History pop-up is open, "Did you Graduate?" checkbox is checked.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Enter "2022-05-15" into Graduation Date field.
5. Leave Degree dropdown empty.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "Degree is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-005: Invalid Date Format (Graduation Date)**
**Test ID**: TC-EDU-NEG-005  
**Priority**: Medium  
**Description**: Attempt to add an education history entry with an invalid date format in Graduation Date.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Enter "15/05/2022" (invalid format) into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "Invalid date format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-006: Future Graduation Date**
**Test ID**: TC-EDU-NEG-006  
**Priority**: Medium  
**Description**: Attempt to add an education history entry with a future graduation date.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Enter "2025-12-31" (future date) into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- Validation message "Graduation date cannot be in the future" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-007: XSS Attempt in School Name Field**
**Test ID**: TC-EDU-NEG-007  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the School Name field.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Enter `<script>alert('XSS')</script>` into School Name field.
2. Select "Nursing" from Course of Study dropdown.
3. Check "Did you Graduate?" checkbox.
4. Enter "2022-05-15" into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Education history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-008: SQL Injection Attempt in Course of Study Field**
**Test ID**: TC-EDU-NEG-008  
**Priority**: High  
**Description**: Attempt to inject a SQL Injection payload into the Course of Study field.  
**Preconditions**: Add New Education History pop-up is open.  
**Test Steps**:
1. Select "Augusta University" from School Name dropdown.
2. Enter `' OR '1'='1` into Course of Study field.
3. Check "Did you Graduate?" checkbox.
4. Enter "2022-05-15" into Graduation Date field.
5. Select "Master of Science" from Degree dropdown.
6. Click "Add Education History" button.
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation.
- Education history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 8
- **Negative Test Cases**: 8
- **Expected Outcomes**: All negative test cases should fail gracefully with appropriate validation messages

### **Expected Outcomes**
- All negative test cases should fail gracefully with appropriate validation messages
- Form validation should prevent submission with invalid data
- Security tests should prevent malicious input and protect against XSS and SQL injection
- User experience should remain smooth with clear error messaging

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All negative test cases show appropriate validation errors
- Form submission is prevented for invalid data
- Security tests prevent malicious input
- Screenshots captured for all test executions
- Comprehensive test reports generated
