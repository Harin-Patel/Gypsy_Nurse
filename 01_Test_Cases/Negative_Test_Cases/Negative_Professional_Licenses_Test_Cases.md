# TGN Website Negative Professional Licenses Test Cases

## Test Suite Overview
**Test Suite**: Negative Professional Licenses Management  
**Total Test Cases**: 15 comprehensive negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Empty Required Fields Tests** (3 test cases)
2. **Invalid Data Format Tests** (4 test cases)
3. **Boundary Value Tests** (3 test cases)
4. **Duplicate Data Tests** (2 test cases)
5. **Security Tests** (3 test cases)

---

## ❌ **NEGATIVE TEST CASES**

### **TC-LICENSE-NEG-001: Empty License Type**
**Test ID**: TC-LICENSE-NEG-001  
**Priority**: High  
**Description**: Test adding license without selecting license type  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Leave License Type field empty
2. Fill in other fields with valid data
3. Click "Add License" button
4. Verify validation message appears

**Expected Result**: Validation message for required license type field  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-002: Empty State Selection**
**Test ID**: TC-LICENSE-NEG-002  
**Priority**: High  
**Description**: Test adding license without selecting state  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter valid license number
3. Leave State field empty
4. Click "Add License" button
5. Verify validation message appears

**Expected Result**: Validation message for required state selection  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-003: Empty License Number**
**Test ID**: TC-LICENSE-NEG-003  
**Priority**: Medium  
**Description**: Test adding license without license number  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Leave License Number field empty
3. Select valid state
4. Click "Add License" button
5. Verify validation message appears

**Expected Result**: Validation message for empty license number field  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-004: Invalid License Number Format**
**Test ID**: TC-LICENSE-NEG-004  
**Priority**: High  
**Description**: Test adding license with invalid license number format  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter invalid license number: "INVALID123"
3. Select valid state
4. Click "Add License" button
5. Verify validation message appears

**Expected Result**: Validation message for invalid license number format  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-005: Special Characters in License Number**
**Test ID**: TC-LICENSE-NEG-005  
**Priority**: Medium  
**Description**: Test adding license with special characters in license number  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter license number with special characters: "RN@#$%^&*()"
3. Select valid state
4. Click "Add License" button
5. Verify validation message appears

**Expected Result**: Validation message for invalid characters in license number  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-006: Very Long License Number**
**Test ID**: TC-LICENSE-NEG-006  
**Priority**: Medium  
**Description**: Test adding license with very long license number  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter very long license number: "RN123456789012345678901234567890"
3. Select valid state
4. Click "Add License" button
5. Verify validation message appears

**Expected Result**: Validation message for license number length limit  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-007: Invalid Expiration Date Format**
**Test ID**: TC-LICENSE-NEG-007  
**Priority**: High  
**Description**: Test adding license with invalid expiration date format  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter valid license number
3. Select valid state
4. Enter invalid expiration date: "13/45/2025"
5. Click "Add License" button
6. Verify validation message appears

**Expected Result**: Validation message for invalid expiration date format  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-008: Past Expiration Date**
**Test ID**: TC-LICENSE-NEG-008  
**Priority**: Medium  
**Description**: Test adding license with past expiration date  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter valid license number
3. Select valid state
4. Enter past expiration date: "01/01/2020"
5. Click "Add License" button
6. Verify validation message appears

**Expected Result**: Validation message for past expiration date  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-009: Very Far Future Expiration Date**
**Test ID**: TC-LICENSE-NEG-009  
**Priority**: Low  
**Description**: Test adding license with very far future expiration date  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter valid license number
3. Select valid state
4. Enter very far future date: "01/01/2100"
5. Click "Add License" button
6. Verify validation message appears

**Expected Result**: Validation message for unrealistic future date  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-010: Duplicate License Number**
**Test ID**: TC-LICENSE-NEG-010  
**Priority**: High  
**Description**: Test adding license with duplicate license number  
**Preconditions**: User has already added a license with specific number  
**Test Steps**:
1. Try to add another license with same license number
2. Click "Add License" button
3. Verify validation message appears
4. Verify duplicate license is not added

**Expected Result**: Validation message for duplicate license number  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-011: Duplicate License Type and State**
**Test ID**: TC-LICENSE-NEG-011  
**Priority**: Medium  
**Description**: Test adding duplicate license type and state combination  
**Preconditions**: User has already added a license with specific type and state  
**Test Steps**:
1. Try to add another license with same type and state
2. Enter different license number
3. Click "Add License" button
4. Verify validation message appears

**Expected Result**: Validation message for duplicate license type and state  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-012: XSS Attempt in License Number**
**Test ID**: TC-LICENSE-NEG-012  
**Priority**: High  
**Description**: Test XSS attempt in license number field  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter XSS attempt in license number: "<script>alert('XSS')</script>"
3. Select valid state
4. Click "Add License" button
5. Verify XSS attempt is sanitized

**Expected Result**: XSS attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-013: SQL Injection Attempt**
**Test ID**: TC-LICENSE-NEG-013  
**Priority**: High  
**Description**: Test SQL injection attempt in license fields  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter SQL injection attempt: "'; DROP TABLE licenses; --"
3. Select valid state
4. Click "Add License" button
5. Verify SQL injection attempt is sanitized

**Expected Result**: SQL injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-014: HTML Injection Attempt**
**Test ID**: TC-LICENSE-NEG-014  
**Priority**: Medium  
**Description**: Test HTML injection attempt in license fields  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select valid License Type
2. Enter HTML injection attempt: "<img src=x onerror=alert('XSS')>"
3. Select valid state
4. Click "Add License" button
5. Verify HTML injection attempt is sanitized

**Expected Result**: HTML injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-015: Cancel License Addition**
**Test ID**: TC-LICENSE-NEG-015  
**Priority**: Low  
**Description**: Test canceling license addition process  
**Preconditions**: Add New License pop-up is open with some data entered  
**Test Steps**:
1. Fill in some license information
2. Click "Cancel" button
3. Verify pop-up closes
4. Verify no license is added
5. Verify form data is not saved

**Expected Result**: Pop-up closes and no license is added  
**Status**: ⏳ PENDING

---

## 📊 **Test Execution Plan**

### **Execution Order**
1. **Empty Required Fields Tests** (TC-LICENSE-NEG-001 to TC-LICENSE-NEG-003)
2. **Invalid Data Format Tests** (TC-LICENSE-NEG-004 to TC-LICENSE-NEG-007)
3. **Boundary Value Tests** (TC-LICENSE-NEG-008 to TC-LICENSE-NEG-009)
4. **Duplicate Data Tests** (TC-LICENSE-NEG-010 to TC-LICENSE-NEG-011)
5. **Security Tests** (TC-LICENSE-NEG-012 to TC-LICENSE-NEG-014)
6. **Cancel Functionality Test** (TC-LICENSE-NEG-015)

### **Test Data Requirements**
- **Invalid License Numbers**: Special characters, very long strings, invalid formats
- **Invalid Dates**: Past dates, invalid formats, very far future dates
- **Security Test Data**: XSS, SQL injection, HTML injection attempts
- **Duplicate Data**: Same license numbers, same type/state combinations

### **Expected Outcomes**
- **Empty Fields**: Clear validation messages for required fields
- **Invalid Formats**: Validation messages for invalid data formats
- **Boundary Values**: Validation messages for edge cases
- **Duplicate Data**: Validation messages for duplicate entries
- **Security Tests**: Proper sanitization of malicious input

## 🎯 **Success Criteria**

### **Negative Test Success**
- Clear validation messages for all invalid inputs
- Form submission prevented for invalid data
- User-friendly error messages
- Proper field highlighting for errors
- Security vulnerabilities properly handled

### **Validation Message Requirements**
- **Empty Fields**: "This field is required"
- **Invalid Formats**: "Please enter a valid format"
- **Duplicate Data**: "This license already exists"
- **Security Issues**: Input properly sanitized

## 📋 **Test Execution Checklist**

### **Pre-Test Setup**
- [ ] Navigate to TGN website
- [ ] Login to user account
- [ ] Access profile section
- [ ] Open Professional Licenses section
- [ ] Verify "Add License" button is accessible

### **Test Execution**
- [ ] Execute empty required fields tests
- [ ] Execute invalid data format tests
- [ ] Execute boundary value tests
- [ ] Execute duplicate data tests
- [ ] Execute security tests
- [ ] Document all results and screenshots

### **Post-Test Cleanup**
- [ ] Document all test results
- [ ] Capture screenshots of all scenarios
- [ ] Record any issues or bugs found
- [ ] Clean up test data
- [ ] Close browser and clean up

---

*Negative professional licenses test cases created using Chrome DevTools MCP for automated testing on January 2025*
