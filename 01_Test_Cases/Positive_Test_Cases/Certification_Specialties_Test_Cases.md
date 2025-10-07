# TGN Website Certification Specialties Test Cases

## Test Suite Overview
**Test Suite**: Certification Specialties Management  
**Total Test Cases**: 25 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Positive Test Cases** (8 test cases)
2. **Negative Test Cases** (10 test cases)
3. **CRUD Operations** (4 test cases)
4. **Security Tests** (3 test cases)

---

## ✅ **POSITIVE TEST CASES**

### **TC-CERTSPEC-POS-001: Add Valid Critical Care Certification**
**Test ID**: TC-CERTSPEC-POS-001  
**Priority**: High  
**Description**: Test adding a valid Critical Care certification with specialty  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Navigate to profile page
2. Scroll to Certification Specialties section
3. Click "Add Certification" button
4. Select "Critical Care" from certification dropdown
5. Select "Adult Critical Care" from specialty dropdown
6. Click "Add Certification" button
7. Verify success message appears
8. Verify certification is added to the list
9. Verify certification count is updated

**Expected Result**: Certification successfully added with confirmation message  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-002: Add Valid Emergency Nursing Certification**
**Test ID**: TC-CERTSPEC-POS-002  
**Priority**: High  
**Description**: Test adding a valid Emergency Nursing certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Emergency Nursing" from certification dropdown
3. Select "Trauma Nursing" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Emergency Nursing certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-003: Add Valid Pediatric Certification**
**Test ID**: TC-CERTSPEC-POS-003  
**Priority**: Medium  
**Description**: Test adding a valid Pediatric certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Pediatric Nursing" from certification dropdown
3. Select "Pediatric Critical Care" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Pediatric certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-004: Add Valid Oncology Certification**
**Test ID**: TC-CERTSPEC-POS-004  
**Priority**: Medium  
**Description**: Test adding a valid Oncology certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Oncology Nursing" from certification dropdown
3. Select "Adult Oncology" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Oncology certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-005: Add Valid Cardiac Certification**
**Test ID**: TC-CERTSPEC-POS-005  
**Priority**: High  
**Description**: Test adding a valid Cardiac certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Cardiac Nursing" from certification dropdown
3. Select "Cardiac Surgery" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Cardiac certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-006: Add Valid Perioperative Certification**
**Test ID**: TC-CERTSPEC-POS-006  
**Priority**: Medium  
**Description**: Test adding a valid Perioperative certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Perioperative Nursing" from certification dropdown
3. Select "Operating Room" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Perioperative certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-007: Add Valid Psychiatric Certification**
**Test ID**: TC-CERTSPEC-POS-007  
**Priority**: Low  
**Description**: Test adding a valid Psychiatric certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Psychiatric Nursing" from certification dropdown
3. Select "Adult Psychiatric" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Psychiatric certification successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-POS-008: Add Valid Geriatric Certification**
**Test ID**: TC-CERTSPEC-POS-008  
**Priority**: Low  
**Description**: Test adding a valid Geriatric certification  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Select "Geriatric Nursing" from certification dropdown
3. Select "Geriatric Care" from specialty dropdown
4. Click "Add Certification" button
5. Verify success message appears
6. Verify certification is added to the list

**Expected Result**: Geriatric certification successfully added  
**Status**: ⏳ PENDING

---

## ❌ **NEGATIVE TEST CASES**

### **TC-CERTSPEC-NEG-001: Empty Certification Selection**
**Test ID**: TC-CERTSPEC-NEG-001  
**Priority**: High  
**Description**: Test adding certification without selecting certification  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Leave Certification field empty
2. Select valid specialty
3. Click "Add Certification" button
4. Verify validation message appears

**Expected Result**: Validation message for required certification field  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-002: Empty Specialty Selection**
**Test ID**: TC-CERTSPEC-NEG-002  
**Priority**: High  
**Description**: Test adding certification without selecting specialty  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Select valid certification
2. Leave Specialty field empty
3. Click "Add Certification" button
4. Verify validation message appears

**Expected Result**: Validation message for required specialty field  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-003: Both Fields Empty**
**Test ID**: TC-CERTSPEC-NEG-003  
**Priority**: High  
**Description**: Test adding certification with both fields empty  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Leave both Certification and Specialty fields empty
2. Click "Add Certification" button
3. Verify validation messages appear

**Expected Result**: Validation messages for both required fields  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-004: Invalid Certification Selection**
**Test ID**: TC-CERTSPEC-NEG-004  
**Priority**: Medium  
**Description**: Test adding certification with invalid certification selection  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Try to select invalid certification (if possible)
2. Select valid specialty
3. Click "Add Certification" button
4. Verify validation message appears

**Expected Result**: Validation message for invalid certification selection  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-005: Invalid Specialty Selection**
**Test ID**: TC-CERTSPEC-NEG-005  
**Priority**: Medium  
**Description**: Test adding certification with invalid specialty selection  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Select valid certification
2. Try to select invalid specialty (if possible)
3. Click "Add Certification" button
4. Verify validation message appears

**Expected Result**: Validation message for invalid specialty selection  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-006: Duplicate Certification Specialty**
**Test ID**: TC-CERTSPEC-NEG-006  
**Priority**: High  
**Description**: Test adding duplicate certification specialty combination  
**Preconditions**: User has already added a specific certification specialty combination  
**Test Steps**:
1. Try to add the same certification specialty combination
2. Click "Add Certification" button
3. Verify validation message appears
4. Verify duplicate certification is not added

**Expected Result**: Validation message for duplicate certification specialty  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-007: Cancel Operation**
**Test ID**: TC-CERTSPEC-NEG-007  
**Priority**: Low  
**Description**: Test canceling the add certification operation  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Fill in valid certification and specialty
2. Click "Cancel" button
3. Verify pop-up closes
4. Verify no certification is added

**Expected Result**: Pop-up closes without adding certification  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-008: Close Pop-up Without Saving**
**Test ID**: TC-CERTSPEC-NEG-008  
**Priority**: Low  
**Description**: Test closing pop-up without saving changes  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Fill in valid certification and specialty
2. Close pop-up using X button (if available)
3. Verify pop-up closes
4. Verify no certification is added

**Expected Result**: Pop-up closes without adding certification  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-009: Submit Without Required Fields**
**Test ID**: TC-CERTSPEC-NEG-009  
**Priority**: High  
**Description**: Test submitting form without required fields  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Leave all required fields empty
2. Click "Add Certification" button
3. Verify validation messages appear
4. Verify form submission is prevented

**Expected Result**: Validation messages for all required fields  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-NEG-010: Invalid Form Submission**
**Test ID**: TC-CERTSPEC-NEG-010  
**Priority**: Medium  
**Description**: Test submitting form with invalid data  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Select invalid certification (if possible)
2. Select invalid specialty (if possible)
3. Click "Add Certification" button
4. Verify validation message appears

**Expected Result**: Validation message for invalid form data  
**Status**: ⏳ PENDING

---

## 🔄 **CRUD OPERATIONS TEST CASES**

### **TC-CERTSPEC-CRUD-001: CREATE Certification Specialty**
**Test ID**: TC-CERTSPEC-CRUD-001  
**Priority**: High  
**Description**: Test creating a new certification specialty (CREATE operation)  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certification" button
2. Fill in all required fields with valid data
3. Click "Add Certification" button
4. Verify certification is created successfully
5. Verify certification appears in the list
6. Verify certification count is updated

**Expected Result**: Certification successfully created  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-CRUD-002: READ Certification Specialty**
**Test ID**: TC-CERTSPEC-CRUD-002  
**Priority**: High  
**Description**: Test viewing existing certification specialties (READ operation)  
**Preconditions**: User has certification specialties in the system  
**Test Steps**:
1. Navigate to Certification Specialties section
2. Verify all certification specialties are displayed
3. Verify certification information is correct
4. Verify edit/delete buttons are available

**Expected Result**: All certification specialties displayed correctly  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-CRUD-003: UPDATE Certification Specialty**
**Test ID**: TC-CERTSPEC-CRUD-003  
**Priority**: High  
**Description**: Test updating an existing certification specialty (UPDATE operation)  
**Preconditions**: User has certification specialties in the system  
**Test Steps**:
1. Click edit button on a certification specialty
2. Modify certification specialty information
3. Click "Update Certification" button
4. Verify certification is updated successfully
5. Verify changes are reflected in the list

**Expected Result**: Certification successfully updated  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-CRUD-004: DELETE Certification Specialty**
**Test ID**: TC-CERTSPEC-CRUD-004  
**Priority**: High  
**Description**: Test deleting an existing certification specialty (DELETE operation)  
**Preconditions**: User has certification specialties in the system  
**Test Steps**:
1. Click delete button on a certification specialty
2. Confirm deletion in dialog
3. Verify certification is deleted successfully
4. Verify certification is removed from the list
5. Verify certification count is updated

**Expected Result**: Certification successfully deleted  
**Status**: ⏳ PENDING

---

## 🛡️ **SECURITY TEST CASES**

### **TC-CERTSPEC-SEC-001: XSS Attempt in Certification Field**
**Test ID**: TC-CERTSPEC-SEC-001  
**Priority**: High  
**Description**: Test XSS attempt in certification field  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Try to inject XSS payload in certification field (if text input available)
2. Fill in other required fields
3. Click "Add Certification" button
4. Verify XSS attempt is sanitized

**Expected Result**: XSS attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-SEC-002: SQL Injection Attempt**
**Test ID**: TC-CERTSPEC-SEC-002  
**Priority**: High  
**Description**: Test SQL injection attempt in certification fields  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Try to inject SQL injection payload in certification fields (if text input available)
2. Fill in other required fields
3. Click "Add Certification" button
4. Verify SQL injection attempt is sanitized

**Expected Result**: SQL injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-CERTSPEC-SEC-003: HTML Injection Attempt**
**Test ID**: TC-CERTSPEC-SEC-003  
**Priority**: Medium  
**Description**: Test HTML injection attempt in certification fields  
**Preconditions**: Add Certification pop-up is open  
**Test Steps**:
1. Try to inject HTML injection payload in certification fields (if text input available)
2. Fill in other required fields
3. Click "Add Certification" button
4. Verify HTML injection attempt is sanitized

**Expected Result**: HTML injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

## 📊 **Test Execution Plan**

### **Execution Order**
1. **Positive Test Cases** (TC-CERTSPEC-POS-001 to TC-CERTSPEC-POS-008)
2. **Negative Test Cases** (TC-CERTSPEC-NEG-001 to TC-CERTSPEC-NEG-010)
3. **CRUD Operations** (TC-CERTSPEC-CRUD-001 to TC-CERTSPEC-CRUD-004)
4. **Security Tests** (TC-CERTSPEC-SEC-001 to TC-CERTSPEC-SEC-003)

### **Test Data Requirements**
- **Valid Certifications**: Critical Care, Emergency Nursing, Pediatric Nursing, Oncology Nursing, Cardiac Nursing, Perioperative Nursing, Psychiatric Nursing, Geriatric Nursing
- **Valid Specialties**: Adult Critical Care, Trauma Nursing, Pediatric Critical Care, Adult Oncology, Cardiac Surgery, Operating Room, Adult Psychiatric, Geriatric Care
- **Invalid Data**: Empty fields, invalid selections, XSS/SQL injection attempts

### **Expected Outcomes**
- **Positive Tests**: Certification specialties added successfully with confirmation
- **Negative Tests**: Clear validation messages for invalid inputs
- **CRUD Operations**: All operations work correctly
- **Security Tests**: Proper sanitization of malicious input

## 🎯 **Success Criteria**

### **Positive Test Success**
- Certification specialties added successfully
- Confirmation messages displayed
- Certification count updated
- Certifications displayed in list
- All fields populated correctly

### **Negative Test Success**
- Clear validation messages for invalid inputs
- Form submission prevented for invalid data
- User-friendly error messages
- Proper field highlighting for errors

### **CRUD Operations Success**
- Create: New certification specialties added successfully
- Read: All certification specialties displayed correctly
- Update: Certification specialty information updated successfully
- Delete: Certification specialties removed with confirmation

### **Security Test Success**
- XSS attempts properly sanitized
- SQL injection attempts blocked
- HTML injection attempts sanitized
- No malicious code execution

## 📋 **Test Execution Checklist**

### **Pre-Test Setup**
- [ ] Navigate to TGN website
- [ ] Login to user account
- [ ] Access profile section
- [ ] Navigate to Certification Specialties section
- [ ] Verify "Add Certification" button is accessible

### **Test Execution**
- [ ] Execute positive test cases
- [ ] Execute negative test cases
- [ ] Execute CRUD operations
- [ ] Execute security tests
- [ ] Document all results and screenshots

### **Post-Test Cleanup**
- [ ] Document all test results
- [ ] Capture screenshots of all scenarios
- [ ] Record any issues or bugs found
- [ ] Clean up test data
- [ ] Close browser and clean up

---

*Certification Specialties test cases created using Chrome DevTools MCP for automated testing on January 2025*
