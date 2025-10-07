# TGN Website Negative Certificates Test Cases

## Test Suite Overview
**Test Suite**: Certificates Management - Negative Scenarios  
**Total Test Cases**: 10 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-CERT-NEG-001: Empty Certificate Name**
**Test ID**: TC-CERT-NEG-001  
**Priority**: High  
**Description**: Attempt to add a certificate without entering a certificate name.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Leave Certificate Name field empty.
2. Enter valid certificate number.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- Validation message "Certificate name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-002: Empty Certificate Number**
**Test ID**: TC-CERT-NEG-002  
**Priority**: High  
**Description**: Attempt to add a certificate without entering a certificate number.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter valid certificate name.
2. Leave Certificate Number field empty.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- Validation message "Certificate number is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-003: Empty Expiration Date**
**Test ID**: TC-CERT-NEG-003  
**Priority**: High  
**Description**: Attempt to add a certificate without entering an expiration date.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter valid certificate name.
2. Enter valid certificate number.
3. Leave Expiration Date field empty.
4. Click "Add Certificate" button.
**Expected Result**:
- Validation message "Expiration date is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-004: Invalid Date Format**
**Test ID**: TC-CERT-NEG-004  
**Priority**: Medium  
**Description**: Attempt to add a certificate with invalid date format.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter valid certificate name.
2. Enter valid certificate number.
3. Enter invalid date format (e.g., "32/13/2025").
4. Click "Add Certificate" button.
**Expected Result**:
- Validation message "Invalid date format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-005: Past Expiration Date**
**Test ID**: TC-CERT-NEG-005  
**Priority**: Medium  
**Description**: Attempt to add a certificate with expiration date in the past.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter valid certificate name.
2. Enter valid certificate number.
3. Enter past expiration date (e.g., "01/01/2020").
4. Click "Add Certificate" button.
**Expected Result**:
- Validation message "Expiration date cannot be in the past" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-006: XSS Attempt in Certificate Name**
**Test ID**: TC-CERT-NEG-006  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload in certificate name field.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter XSS payload in certificate name: `<script>alert('XSS')</script>`
2. Enter valid certificate number.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- XSS payload should be sanitized or encoded.
- Certificate should be added with sanitized text or submission prevented with error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-007: SQL Injection in Certificate Number**
**Test ID**: TC-CERT-NEG-007  
**Priority**: Critical  
**Description**: Attempt to inject SQL injection payload in certificate number field.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter valid certificate name.
2. Enter SQL injection payload in certificate number: `' OR '1'='1`
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- SQL injection payload should be sanitized or escaped.
- Certificate should be added with sanitized text or submission prevented with error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-008: Very Long Certificate Name**
**Test ID**: TC-CERT-NEG-008  
**Priority**: Medium  
**Description**: Attempt to add a certificate with extremely long name.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter very long certificate name (500+ characters).
2. Enter valid certificate number.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- System should handle long input gracefully.
- Appropriate validation message should be displayed.
- No system errors should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-009: Duplicate Certificate Number**
**Test ID**: TC-CERT-NEG-009  
**Priority**: High  
**Description**: Attempt to add a certificate with duplicate certificate number.  
**Preconditions**: Add New Certificate pop-up is open, certificate with same number already exists.  
**Test Steps**:
1. Enter valid certificate name.
2. Enter certificate number that already exists.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- Error message "Certificate number already exists" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-NEG-010: Special Characters in Certificate Name**
**Test ID**: TC-CERT-NEG-010  
**Priority**: Medium  
**Description**: Attempt to add a certificate with special characters in name.  
**Preconditions**: Add New Certificate pop-up is open.  
**Test Steps**:
1. Enter certificate name with special characters: "BLS@#$%^&*()"
2. Enter valid certificate number.
3. Enter valid expiration date.
4. Click "Add Certificate" button.
**Expected Result**:
- System should handle special characters appropriately.
- Certificate should be added with sanitized name or validation message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 10
- **Validation Tests**: 5 test cases
- **Security Tests**: 2 test cases
- **Edge Case Tests**: 3 test cases

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
