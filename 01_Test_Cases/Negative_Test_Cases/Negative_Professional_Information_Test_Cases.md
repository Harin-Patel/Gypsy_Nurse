# TGN Website Negative Professional Information Edit Test Cases

## Test Suite Overview
**Test Suite**: Negative Professional Information Editing  
**Total Test Cases**: 15 comprehensive negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Empty Required Fields Tests** (3 test cases)
2. **Invalid Data Format Tests** (5 test cases)
3. **Boundary Value Tests** (3 test cases)
4. **Security Tests** (2 test cases)
5. **Error Handling Tests** (2 test cases)

---

## 🚫 **EMPTY REQUIRED FIELDS TESTS**

### **TC-PROF-NEG-001: Empty Date of Birth**
**Test ID**: TC-PROF-NEG-001  
**Priority**: High  
**Description**: Test form submission with empty date of birth field  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Leave date of birth field empty
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Date of birth is required" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-002: Empty Social Security Number**
**Test ID**: TC-PROF-NEG-002  
**Priority**: High  
**Description**: Test form submission with empty SSN field  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Leave SSN field empty
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Social Security Number is required" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-003: Empty Years of Experience**
**Test ID**: TC-PROF-NEG-003  
**Priority**: High  
**Description**: Test form submission with empty years of experience field  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Leave years of experience field empty
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Years of experience is required" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

## 📝 **INVALID DATA FORMAT TESTS**

### **TC-PROF-NEG-004: Invalid Date Format**
**Test ID**: TC-PROF-NEG-004  
**Priority**: High  
**Description**: Test form submission with invalid date format  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter invalid date format (e.g., "32/13/2025", "2025-13-32")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Invalid date format" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-005: Invalid SSN Format (Less than 9 digits)**
**Test ID**: TC-PROF-NEG-005  
**Priority**: High  
**Description**: Test form submission with SSN less than 9 digits  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter SSN with less than 9 digits (e.g., "12345678")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Social Security Number must be exactly 9 digits" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-006: Invalid SSN Format (More than 9 digits)**
**Test ID**: TC-PROF-NEG-006  
**Priority**: High  
**Description**: Test form submission with SSN more than 9 digits  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter SSN with more than 9 digits (e.g., "1234567890")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Social Security Number must be exactly 9 digits" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-007: Invalid Zipcode Format (Less than 5 digits)**
**Test ID**: TC-PROF-NEG-007  
**Priority**: High  
**Description**: Test form submission with zipcode less than 5 digits  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter zipcode with less than 5 digits (e.g., "1234")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Zipcode must be exactly 5 digits" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-008: Invalid Zipcode Format (More than 5 digits)**
**Test ID**: TC-PROF-NEG-008  
**Priority**: High  
**Description**: Test form submission with zipcode more than 5 digits  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter zipcode with more than 5 digits (e.g., "123456")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Zipcode must be exactly 5 digits" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

## 🔢 **BOUNDARY VALUE TESTS**

### **TC-PROF-NEG-009: Years of Experience Below Minimum (0)**
**Test ID**: TC-PROF-NEG-009  
**Priority**: High  
**Description**: Test form submission with years of experience below minimum  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter years of experience as 0
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Years of experience must be between 1 and 50" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-010: Years of Experience Above Maximum (51)**
**Test ID**: TC-PROF-NEG-010  
**Priority**: High  
**Description**: Test form submission with years of experience above maximum  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter years of experience as 51
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Years of experience must be between 1 and 50" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-011: Future Date of Birth**
**Test ID**: TC-PROF-NEG-011  
**Priority**: Medium  
**Description**: Test form submission with future date of birth  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all other required fields with valid data
2. Enter future date of birth (e.g., "2030-01-15")
3. Click "Update Profile" button
4. Verify validation message appears
5. Check form behavior

**Expected Result**: "Date of birth cannot be in the future" validation message appears and form submission is prevented  
**Status**: ⏳ PENDING

---

## 🔒 **SECURITY TESTS**

### **TC-PROF-NEG-012: XSS Attempt in Text Fields**
**Test ID**: TC-PROF-NEG-012  
**Priority**: High  
**Description**: Test form submission with XSS attempt in text fields  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all required fields with valid data
2. Enter XSS attempt in street address field: "<script>alert('XSS')</script>"
3. Click "Update Profile" button
4. Verify XSS attempt is sanitized
5. Check form behavior

**Expected Result**: XSS attempt is sanitized and form submission is prevented or sanitized  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-013: SQL Injection Attempt**
**Test ID**: TC-PROF-NEG-013  
**Priority**: High  
**Description**: Test form submission with SQL injection attempt  
**Preconditions**: Edit professional information pop-up is open  
**Test Steps**:
1. Fill all required fields with valid data
2. Enter SQL injection attempt in city field: "'; DROP TABLE users; --"
3. Click "Update Profile" button
4. Verify SQL injection attempt is sanitized
5. Check form behavior

**Expected Result**: SQL injection attempt is sanitized and form submission is prevented or sanitized  
**Status**: ⏳ PENDING

---

## ⚠️ **ERROR HANDLING TESTS**

### **TC-PROF-NEG-014: Network Error Simulation**
**Test ID**: TC-PROF-NEG-014  
**Priority**: Medium  
**Description**: Test form submission with network error simulation  
**Preconditions**: Edit professional information pop-up is open with valid data  
**Test Steps**:
1. Fill form with valid data
2. Simulate network failure
3. Click "Update Profile" button
4. Verify error message is displayed
5. Check form data preservation

**Expected Result**: Network error handled gracefully with clear error message and form data preserved  
**Status**: ⏳ PENDING

---

### **TC-PROF-NEG-015: Server Error Simulation**
**Test ID**: TC-PROF-NEG-015  
**Priority**: Medium  
**Description**: Test form submission with server error simulation  
**Preconditions**: Edit professional information pop-up is open with valid data  
**Test Steps**:
1. Fill form with valid data
2. Simulate server error
3. Click "Update Profile" button
4. Verify error message is displayed
5. Check form data preservation

**Expected Result**: Server error handled gracefully with clear error message and form data preserved  
**Status**: ⏳ PENDING

---

## 📊 **Test Execution Plan**

### **Execution Order**
1. **Empty Required Fields Tests** (TC-PROF-NEG-001 to TC-PROF-NEG-003)
2. **Invalid Data Format Tests** (TC-PROF-NEG-004 to TC-PROF-NEG-008)
3. **Boundary Value Tests** (TC-PROF-NEG-009 to TC-PROF-NEG-011)
4. **Security Tests** (TC-PROF-NEG-012 to TC-PROF-NEG-013)
5. **Error Handling Tests** (TC-PROF-NEG-014 to TC-PROF-NEG-015)

### **Test Data Requirements**
- **Valid Test Data**: For fields that should remain valid during negative testing
- **Invalid Test Data**: Specific invalid data for each test case
- **Boundary Values**: Edge case values for boundary testing
- **Security Test Data**: XSS and SQL injection attempts
- **Error Simulation**: Network and server error scenarios

### **Expected Outcomes**
- **Validation Messages**: Clear, user-friendly error messages
- **Form Behavior**: Form submission prevented for invalid data
- **Data Preservation**: Form data preserved during error states
- **Security**: Proper sanitization of malicious input
- **User Experience**: Clear feedback and error handling

## 🎯 **Success Criteria**

### **Validation Success**
- All required field validations work correctly
- All format validations work correctly
- All boundary value validations work correctly
- Clear, user-friendly error messages displayed
- Form submission prevented for invalid data

### **Security Success**
- XSS attempts properly sanitized
- SQL injection attempts properly sanitized
- No security vulnerabilities exposed
- Proper input validation and sanitization

### **Error Handling Success**
- Network errors handled gracefully
- Server errors handled gracefully
- Form data preserved during errors
- Clear error messages displayed
- User can retry after errors

## 📋 **Test Execution Checklist**

### **Pre-Test Setup**
- [ ] Navigate to TGN website
- [ ] Login to user account
- [ ] Access profile section
- [ ] Open edit professional information pop-up
- [ ] Verify all form fields are accessible

### **Test Execution**
- [ ] Execute empty required fields tests
- [ ] Execute invalid data format tests
- [ ] Execute boundary value tests
- [ ] Execute security tests
- [ ] Execute error handling tests

### **Post-Test Cleanup**
- [ ] Document all test results
- [ ] Capture screenshots of error messages
- [ ] Record any issues or bugs found
- [ ] Clean up test data
- [ ] Close browser and clean up

---

*Negative professional information edit test cases created using Chrome DevTools MCP for automated testing on January 2025*
