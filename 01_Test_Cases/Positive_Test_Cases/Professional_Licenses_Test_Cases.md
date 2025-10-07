# TGN Website Professional Licenses Test Cases

## Test Suite Overview
**Test Suite**: Professional Licenses Management  
**Total Test Cases**: 20 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Positive Test Cases** (8 test cases)
2. **Negative Test Cases** (8 test cases)
3. **Boundary Value Tests** (2 test cases)
4. **Security Tests** (2 test cases)

---

## ✅ **POSITIVE TEST CASES**

### **TC-LICENSE-POS-001: Add Valid RN License**
**Test ID**: TC-LICENSE-POS-001  
**Priority**: High  
**Description**: Test adding a valid Registered Nurse license with all required fields  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select "Registered Nurse (RN)" from License Type dropdown
2. Enter valid license number: "RN123456789"
3. Select state from State dropdown: "New York"
4. Enter expiration date: "12/31/2025"
5. Click "Add License" button
6. Verify license is added successfully

**Expected Result**: License added successfully with confirmation message  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-002: Add Valid LPN License**
**Test ID**: TC-LICENSE-POS-002  
**Priority**: High  
**Description**: Test adding a valid Licensed Practical Nurse license  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select "Licensed Practical Nurse (LPN)" from License Type dropdown
2. Enter valid license number: "LPN987654321"
3. Select state from State dropdown: "California"
4. Enter expiration date: "06/30/2026"
5. Click "Add License" button
6. Verify license is added successfully

**Expected Result**: LPN license added successfully with confirmation message  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-003: Add Valid CNA License**
**Test ID**: TC-LICENSE-POS-003  
**Priority**: High  
**Description**: Test adding a valid Certified Nursing Assistant license  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select "Certified Nursing Assistant (CNA)" from License Type dropdown
2. Enter valid license number: "CNA456789123"
3. Select state from State dropdown: "Texas"
4. Enter expiration date: "03/15/2025"
5. Click "Add License" button
6. Verify license is added successfully

**Expected Result**: CNA license added successfully with confirmation message  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-004: Add License with Optional Fields**
**Test ID**: TC-LICENSE-POS-004  
**Priority**: Medium  
**Description**: Test adding a license with only required fields (no optional fields)  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Select "Registered Nurse (RN)" from License Type dropdown
2. Leave License Number field empty (optional)
3. Select state from State dropdown: "Florida"
4. Leave Expiration Date field empty (optional)
5. Click "Add License" button
6. Verify license is added successfully

**Expected Result**: License added successfully with only required fields  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-005: Add Multiple Licenses**
**Test ID**: TC-LICENSE-POS-005  
**Priority**: Medium  
**Description**: Test adding multiple licenses for the same user  
**Preconditions**: User has already added one license  
**Test Steps**:
1. Click "Add License" button
2. Add second license with different type and state
3. Verify both licenses are displayed
4. Test adding third license
5. Verify all licenses are properly listed

**Expected Result**: Multiple licenses added and displayed correctly  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-006: Edit Existing License**
**Test ID**: TC-LICENSE-POS-006  
**Priority**: Medium  
**Description**: Test editing an existing license  
**Preconditions**: User has at least one license added  
**Test Steps**:
1. Click edit button on existing license
2. Modify license details (number, expiration date)
3. Save changes
4. Verify updated license information

**Expected Result**: License updated successfully with new information  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-007: Delete License**
**Test ID**: TC-LICENSE-POS-007  
**Priority**: Medium  
**Description**: Test deleting an existing license  
**Preconditions**: User has at least one license added  
**Test Steps**:
1. Click delete button on existing license
2. Confirm deletion in confirmation dialog
3. Verify license is removed from list
4. Verify license count is updated

**Expected Result**: License deleted successfully and removed from list  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-POS-008: Cancel License Addition**
**Test ID**: TC-LICENSE-POS-008  
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

## ❌ **NEGATIVE TEST CASES**

### **TC-LICENSE-NEG-001: Empty Required Fields**
**Test ID**: TC-LICENSE-NEG-001  
**Priority**: High  
**Description**: Test adding license with empty required fields  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Leave License Type field empty
2. Click "Add License" button
3. Verify validation message appears
4. Test with other required fields empty

**Expected Result**: Validation messages appear for empty required fields  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-NEG-002: Invalid License Number Format**
**Test ID**: TC-LICENSE-NEG-002  
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

### **TC-LICENSE-NEG-003: Invalid Expiration Date**
**Test ID**: TC-LICENSE-NEG-003  
**Priority**: High  
**Description**: Test adding license with invalid expiration date  
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

### **TC-LICENSE-NEG-004: Past Expiration Date**
**Test ID**: TC-LICENSE-NEG-004  
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

### **TC-LICENSE-NEG-005: Duplicate License Number**
**Test ID**: TC-LICENSE-NEG-005  
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

### **TC-LICENSE-NEG-006: Special Characters in License Number**
**Test ID**: TC-LICENSE-NEG-006  
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

### **TC-LICENSE-NEG-007: Very Long License Number**
**Test ID**: TC-LICENSE-NEG-007  
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

### **TC-LICENSE-NEG-008: Empty State Selection**
**Test ID**: TC-LICENSE-NEG-008  
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

## 🔢 **BOUNDARY VALUE TESTS**

### **TC-LICENSE-BOUND-001: License Number Length Limits**
**Test ID**: TC-LICENSE-BOUND-001  
**Priority**: Medium  
**Description**: Test license number with minimum and maximum length limits  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Test with minimum length license number: "RN1"
2. Test with maximum length license number: "RN12345678901234567890"
3. Verify validation for both scenarios
4. Test with exactly allowed length

**Expected Result**: Proper validation for license number length limits  
**Status**: ⏳ PENDING

---

### **TC-LICENSE-BOUND-002: Expiration Date Boundaries**
**Test ID**: TC-LICENSE-BOUND-002  
**Priority**: Medium  
**Description**: Test expiration date with boundary values  
**Preconditions**: Add New License pop-up is open  
**Test Steps**:
1. Test with expiration date exactly today
2. Test with expiration date tomorrow
3. Test with expiration date 1 year from now
4. Test with expiration date 10 years from now
5. Verify validation for each scenario

**Expected Result**: Proper validation for expiration date boundaries  
**Status**: ⏳ PENDING

---

## 🔒 **SECURITY TESTS**

### **TC-LICENSE-SEC-001: XSS Attempt in License Number**
**Test ID**: TC-LICENSE-SEC-001  
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

### **TC-LICENSE-SEC-002: SQL Injection Attempt**
**Test ID**: TC-LICENSE-SEC-002  
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

## 📊 **Test Execution Plan**

### **Execution Order**
1. **Positive Test Cases** (TC-LICENSE-POS-001 to TC-LICENSE-POS-008)
2. **Negative Test Cases** (TC-LICENSE-NEG-001 to TC-LICENSE-NEG-008)
3. **Boundary Value Tests** (TC-LICENSE-BOUND-001 to TC-LICENSE-BOUND-002)
4. **Security Tests** (TC-LICENSE-SEC-001 to TC-LICENSE-SEC-002)

### **Test Data Requirements**
- **Valid License Types**: RN, LPN, CNA, NP, CRNA, etc.
- **Valid License Numbers**: Various formats for different license types
- **Valid States**: All US states and territories
- **Valid Expiration Dates**: Future dates in various formats
- **Invalid Test Data**: Invalid formats, past dates, special characters
- **Security Test Data**: XSS and SQL injection attempts

### **Expected Outcomes**
- **Positive Cases**: Licenses added successfully with confirmation messages
- **Negative Cases**: Clear validation messages for invalid inputs
- **Boundary Cases**: Proper validation for edge cases
- **Security Cases**: Proper sanitization of malicious input

## 🎯 **Success Criteria**

### **Positive Test Success**
- All valid licenses added successfully
- Confirmation messages displayed
- License count updated correctly
- Licenses displayed in profile

### **Negative Test Success**
- Clear validation messages for all invalid inputs
- Form submission prevented for invalid data
- User-friendly error messages
- Proper field highlighting for errors

### **Security Test Success**
- XSS attempts properly sanitized
- SQL injection attempts properly sanitized
- No security vulnerabilities exposed
- Proper input validation and sanitization

## 📋 **Test Execution Checklist**

### **Pre-Test Setup**
- [ ] Navigate to TGN website
- [ ] Login to user account
- [ ] Access profile section
- [ ] Open Professional Licenses section
- [ ] Verify "Add License" button is accessible

### **Test Execution**
- [ ] Execute positive test cases
- [ ] Execute negative test cases
- [ ] Execute boundary value tests
- [ ] Execute security tests
- [ ] Document all results and screenshots

### **Post-Test Cleanup**
- [ ] Document all test results
- [ ] Capture screenshots of all scenarios
- [ ] Record any issues or bugs found
- [ ] Clean up test data
- [ ] Close browser and clean up

---

*Professional licenses test cases created using Chrome DevTools MCP for automated testing on January 2025*
