# TGN Website Negative Registration Test Cases

## Test Suite Overview
**Test Suite**: Registration Functionality - Negative Scenarios  
**Total Test Cases**: 15 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-REG-NEG-001: Empty Required Fields**
**Test ID**: TC-REG-NEG-001  
**Priority**: High  
**Description**: Attempt to register with empty required fields.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Leave all required fields empty.
3. Click "Create Account" button.
**Expected Result**:
- Validation messages for all required fields displayed.
- Form submission prevented.
- User remains on registration page.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-002: Invalid Email Format**
**Test ID**: TC-REG-NEG-002  
**Priority**: High  
**Description**: Attempt to register with invalid email format.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter invalid email format (e.g., "invalid-email").
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- Validation message "Invalid email format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-003: Duplicate Email Address**
**Test ID**: TC-REG-NEG-003  
**Priority**: High  
**Description**: Attempt to register with already existing email address.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter email address that already exists in the system.
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- Error message "Email address already exists" displayed.
- Form submission prevented.
- User can try with different email.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-004: Weak Password**
**Test ID**: TC-REG-NEG-004  
**Priority**: High  
**Description**: Attempt to register with weak password.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter valid email address.
3. Enter weak password (e.g., "123").
4. Fill in other required fields.
5. Click "Create Account" button.
**Expected Result**:
- Validation message "Password must be at least 8 characters with uppercase, lowercase, number, and special character" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-005: Password Mismatch**
**Test ID**: TC-REG-NEG-005  
**Priority**: High  
**Description**: Attempt to register with mismatched passwords.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter valid email address.
3. Enter password (e.g., "Password123!").
4. Enter different password in confirm field (e.g., "Password456!").
5. Fill in other required fields.
6. Click "Create Account" button.
**Expected Result**:
- Validation message "Passwords do not match" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-006: Invalid First Name**
**Test ID**: TC-REG-NEG-006  
**Priority**: Medium  
**Description**: Attempt to register with invalid first name.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter invalid first name (e.g., "123" or "A").
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- Validation message "First name must contain only letters and be at least 2 characters" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-007: Invalid Last Name**
**Test ID**: TC-REG-NEG-007  
**Priority**: Medium  
**Description**: Attempt to register with invalid last name.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter invalid last name (e.g., "123" or "A").
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- Validation message "Last name must contain only letters and be at least 2 characters" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-008: XSS Attempt in Name Fields**
**Test ID**: TC-REG-NEG-008  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload in name fields.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter XSS payload in first name: `<script>alert('XSS')</script>`
3. Enter XSS payload in last name: `<script>alert('XSS')</script>`
4. Fill in other required fields.
5. Click "Create Account" button.
**Expected Result**:
- XSS payload should be sanitized or encoded.
- Registration should be prevented with appropriate error message.
- No script execution should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-009: SQL Injection in Email Field**
**Test ID**: TC-REG-NEG-009  
**Priority**: Critical  
**Description**: Attempt to inject SQL injection payload in email field.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter SQL injection payload in email: `' OR '1'='1`
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- SQL injection payload should be sanitized or escaped.
- Registration should be prevented with appropriate error message.
- No database manipulation should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-010: Very Long Input Fields**
**Test ID**: TC-REG-NEG-010  
**Priority**: Medium  
**Description**: Attempt to register with extremely long input values.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter very long first name (500+ characters).
3. Enter very long last name (500+ characters).
4. Enter very long email (300+ characters).
5. Fill in other required fields.
6. Click "Create Account" button.
**Expected Result**:
- System should handle long inputs gracefully.
- Appropriate validation messages should be displayed.
- No system errors should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-011: Special Characters in Name Fields**
**Test ID**: TC-REG-NEG-011  
**Priority**: Medium  
**Description**: Attempt to register with special characters in name fields.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter first name with special characters: "John@#$%"
3. Enter last name with special characters: "Doe!@#$%"
4. Fill in other required fields.
5. Click "Create Account" button.
**Expected Result**:
- Validation message "Name fields should contain only letters" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-012: Terms and Conditions Not Accepted**
**Test ID**: TC-REG-NEG-012  
**Priority**: High  
**Description**: Attempt to register without accepting terms and conditions.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Fill in all required fields correctly.
3. Do not check "Accept Terms and Conditions" checkbox.
4. Click "Create Account" button.
**Expected Result**:
- Validation message "You must accept the terms and conditions" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-013: Invalid Company Name (Employer)**
**Test ID**: TC-REG-NEG-013  
**Priority**: Medium  
**Description**: Attempt to register as employer with invalid company name.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Select "Employer" as user type.
3. Enter invalid company name (e.g., "A" or "123").
4. Fill in other required fields.
5. Click "Create Account" button.
**Expected Result**:
- Validation message "Company name must be at least 2 characters" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-014: Registration with Blocked Email Domain**
**Test ID**: TC-REG-NEG-014  
**Priority**: Medium  
**Description**: Attempt to register with email from blocked domain.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter email from blocked domain (e.g., "user@spam.com").
3. Fill in other required fields.
4. Click "Create Account" button.
**Expected Result**:
- Error message "Email domain is not allowed" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-NEG-015: Registration Rate Limiting**
**Test ID**: TC-REG-NEG-015  
**Priority**: High  
**Description**: Test system response to multiple registration attempts.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Fill in registration form.
3. Click "Create Account" button.
4. Repeat registration process multiple times quickly.
**Expected Result**:
- After multiple attempts, rate limiting should be applied.
- Error message "Too many registration attempts. Please try again later" displayed.
- Registration should be temporarily blocked.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 15
- **Validation Tests**: 8 test cases
- **Security Tests**: 3 test cases
- **Edge Case Tests**: 4 test cases

### **Expected Outcomes**
- All negative test cases should fail gracefully with appropriate error messages
- Security tests should prevent malicious input and protect against attacks
- Validation tests should prevent invalid data submission
- Edge case tests should handle unusual inputs without system errors

### **Test Environment Requirements**
- Invalid test data for validation testing
- Malicious payloads for security testing
- Various edge case inputs for boundary testing
- Stable internet connection
- Chrome browser with DevTools MCP enabled

### **Success Criteria**
- All negative test cases show appropriate error handling
- Security vulnerabilities are prevented
- Form validation works correctly
- User experience remains smooth even with invalid inputs
- Screenshots captured for all test executions
- Comprehensive test reports generated
