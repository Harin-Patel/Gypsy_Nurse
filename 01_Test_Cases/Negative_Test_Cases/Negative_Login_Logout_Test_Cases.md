# TGN Website Negative Login Test Cases

## Test Suite Overview
**Test Suite**: Login Functionality - Negative Scenarios  
**Total Test Cases**: 12 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-LOGIN-NEG-001: Invalid Email Format**
**Test ID**: TC-LOGIN-NEG-001  
**Priority**: High  
**Description**: Attempt to login with invalid email format.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter invalid email format (e.g., "invalid-email").
3. Enter valid password.
4. Click "Login" button.
**Expected Result**:
- Validation message "Invalid email format" displayed.
- Login form submission prevented.
- User remains on login page.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-002: Empty Email Field**
**Test ID**: TC-LOGIN-NEG-002  
**Priority**: High  
**Description**: Attempt to login with empty email field.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Leave email field empty.
3. Enter valid password.
4. Click "Login" button.
**Expected Result**:
- Validation message "Email is required" displayed.
- Login form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-003: Empty Password Field**
**Test ID**: TC-LOGIN-NEG-003  
**Priority**: High  
**Description**: Attempt to login with empty password field.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address.
3. Leave password field empty.
4. Click "Login" button.
**Expected Result**:
- Validation message "Password is required" displayed.
- Login form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-004: Wrong Password**
**Test ID**: TC-LOGIN-NEG-004  
**Priority**: High  
**Description**: Attempt to login with correct email but wrong password.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address.
3. Enter incorrect password.
4. Click "Login" button.
**Expected Result**:
- Error message "Invalid email or password" displayed.
- Login attempt failed.
- User remains on login page.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-005: Non-existent Email**
**Test ID**: TC-LOGIN-NEG-005  
**Priority**: High  
**Description**: Attempt to login with non-existent email address.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter non-existent email (e.g., "nonexistent@example.com").
3. Enter any password.
4. Click "Login" button.
**Expected Result**:
- Error message "Invalid email or password" displayed.
- Login attempt failed.
- User remains on login page.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-006: SQL Injection in Email Field**
**Test ID**: TC-LOGIN-NEG-006  
**Priority**: Critical  
**Description**: Attempt to inject SQL injection payload in email field.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter SQL injection payload in email field: `' OR '1'='1`
3. Enter any password.
4. Click "Login" button.
**Expected Result**:
- SQL injection payload should be sanitized or escaped.
- Login attempt should fail with appropriate error message.
- No database manipulation should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-007: XSS Attempt in Email Field**
**Test ID**: TC-LOGIN-NEG-007  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload in email field.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter XSS payload in email field: `<script>alert('XSS')</script>`
3. Enter any password.
4. Click "Login" button.
**Expected Result**:
- XSS payload should be sanitized or encoded.
- Login attempt should fail with appropriate error message.
- No script execution should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-008: Brute Force Attack Simulation**
**Test ID**: TC-LOGIN-NEG-008  
**Priority**: High  
**Description**: Test system response to multiple failed login attempts.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address.
3. Enter wrong password.
4. Click "Login" button.
5. Repeat steps 3-4 multiple times (5+ attempts).
**Expected Result**:
- After multiple failed attempts, account should be temporarily locked.
- Error message "Account temporarily locked due to multiple failed attempts" displayed.
- Rate limiting should be applied.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-009: Special Characters in Password**
**Test ID**: TC-LOGIN-NEG-009  
**Priority**: Medium  
**Description**: Test login with password containing special characters.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address.
3. Enter password with special characters: `Pass@123!@#$%^&*()`
4. Click "Login" button.
**Expected Result**:
- System should handle special characters properly.
- Login should work if password is correct.
- No encoding issues should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-010: Very Long Email Address**
**Test ID**: TC-LOGIN-NEG-010  
**Priority**: Medium  
**Description**: Test login with extremely long email address.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter very long email address (300+ characters).
3. Enter valid password.
4. Click "Login" button.
**Expected Result**:
- System should handle long email addresses gracefully.
- Appropriate validation message should be displayed.
- No system errors should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-011: Case Sensitivity in Email**
**Test ID**: TC-LOGIN-NEG-011  
**Priority**: Medium  
**Description**: Test login with different case in email address.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter email with different case (e.g., "JOHN.DOE@EXAMPLE.COM" instead of "john.doe@example.com").
3. Enter valid password.
4. Click "Login" button.
**Expected Result**:
- System should handle case insensitivity properly.
- Login should work regardless of email case.
- Email should be normalized.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-NEG-012: Session Timeout**
**Test ID**: TC-LOGIN-NEG-012  
**Priority**: Medium  
**Description**: Test login after session timeout.  
**Preconditions**: User was logged in but session expired.  
**Test Steps**:
1. Login to the system.
2. Wait for session to expire (or manually expire session).
3. Try to access protected page.
4. Verify redirect to login page.
5. Attempt to login again.
**Expected Result**:
- User should be redirected to login page after session timeout.
- Login should work normally after session expiry.
- No session-related errors should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 12
- **Validation Tests**: 5 test cases
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
