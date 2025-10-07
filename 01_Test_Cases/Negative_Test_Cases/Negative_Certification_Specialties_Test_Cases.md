# TGN Website Negative Certification Specialties Test Cases

## Test Suite Overview
**Test Suite**: Certification Specialties Management - Negative Scenarios  
**Total Test Cases**: 10 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-SPEC-NEG-001: Empty Specialty Name**
**Test ID**: TC-SPEC-NEG-001  
**Priority**: High  
**Description**: Attempt to add a certification specialty without entering a specialty name.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Leave Specialty Name field empty.
2. Enter valid certification body.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- Validation message "Specialty name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-002: Empty Certification Body**
**Test ID**: TC-SPEC-NEG-002  
**Priority**: High  
**Description**: Attempt to add a certification specialty without entering a certification body.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter valid specialty name.
2. Leave Certification Body field empty.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- Validation message "Certification body is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-003: Empty Certification Date**
**Test ID**: TC-SPEC-NEG-003  
**Priority**: High  
**Description**: Attempt to add a certification specialty without entering a certification date.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter valid specialty name.
2. Enter valid certification body.
3. Leave Certification Date field empty.
4. Click "Add Specialty" button.
**Expected Result**:
- Validation message "Certification date is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-004: Invalid Date Format**
**Test ID**: TC-SPEC-NEG-004  
**Priority**: Medium  
**Description**: Attempt to add a certification specialty with invalid date format.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter valid specialty name.
2. Enter valid certification body.
3. Enter invalid date format (e.g., "32/13/2025").
4. Click "Add Specialty" button.
**Expected Result**:
- Validation message "Invalid date format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-005: Future Certification Date**
**Test ID**: TC-SPEC-NEG-005  
**Priority**: Medium  
**Description**: Attempt to add a certification specialty with certification date in the future.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter valid specialty name.
2. Enter valid certification body.
3. Enter future certification date (e.g., "01/01/2026").
4. Click "Add Specialty" button.
**Expected Result**:
- Validation message "Certification date cannot be in the future" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-006: XSS Attempt in Specialty Name**
**Test ID**: TC-SPEC-NEG-006  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload in specialty name field.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter XSS payload in specialty name: `<script>alert('XSS')</script>`
2. Enter valid certification body.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- XSS payload should be sanitized or encoded.
- Specialty should be added with sanitized text or submission prevented with error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-007: SQL Injection in Certification Body**
**Test ID**: TC-SPEC-NEG-007  
**Priority**: Critical  
**Description**: Attempt to inject SQL injection payload in certification body field.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter valid specialty name.
2. Enter SQL injection payload in certification body: `' OR '1'='1`
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- SQL injection payload should be sanitized or escaped.
- Specialty should be added with sanitized text or submission prevented with error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-008: Very Long Specialty Name**
**Test ID**: TC-SPEC-NEG-008  
**Priority**: Medium  
**Description**: Attempt to add a certification specialty with extremely long name.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter very long specialty name (500+ characters).
2. Enter valid certification body.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- System should handle long input gracefully.
- Appropriate validation message should be displayed.
- No system errors should occur.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-009: Duplicate Specialty Name**
**Test ID**: TC-SPEC-NEG-009  
**Priority**: High  
**Description**: Attempt to add a certification specialty with duplicate name.  
**Preconditions**: Add New Certification Specialty pop-up is open, specialty with same name already exists.  
**Test Steps**:
1. Enter specialty name that already exists.
2. Enter valid certification body.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- Error message "Specialty name already exists" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-NEG-010: Special Characters in Specialty Name**
**Test ID**: TC-SPEC-NEG-010  
**Priority**: Medium  
**Description**: Attempt to add a certification specialty with special characters in name.  
**Preconditions**: Add New Certification Specialty pop-up is open.  
**Test Steps**:
1. Enter specialty name with special characters: "Critical Care@#$%^&*()"
2. Enter valid certification body.
3. Enter valid certification date.
4. Click "Add Specialty" button.
**Expected Result**:
- System should handle special characters appropriately.
- Specialty should be added with sanitized name or validation message displayed.
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
