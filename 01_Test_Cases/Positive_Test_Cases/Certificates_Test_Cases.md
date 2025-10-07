# TGN Website Certificates Test Cases

## Test Suite Overview
**Test Suite**: Certificates Management  
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

### **TC-CERT-POS-001: Add Valid BLS Certificate**
**Test ID**: TC-CERT-POS-001  
**Priority**: High  
**Description**: Test adding a valid Basic Life Support (BLS) certificate with all required fields  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Navigate to profile page
2. Scroll to Certificates section
3. Click "Add Certificate" button
4. Select "Basic Life Support (BLS)" from certificate type dropdown
5. Enter certificate number: "BLS123456789"
6. Select issuing organization: "American Heart Association"
7. Enter issue date: "2024-01-15"
8. Enter expiration date: "2025-01-15"
9. Click "Add Certificate" button
10. Verify success message appears
11. Verify certificate is added to the list
12. Verify certificate count is updated

**Expected Result**: Certificate successfully added with confirmation message  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-002: Add Valid ACLS Certificate**
**Test ID**: TC-CERT-POS-002  
**Priority**: High  
**Description**: Test adding a valid Advanced Cardiac Life Support (ACLS) certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Advanced Cardiac Life Support (ACLS)" from certificate type dropdown
3. Enter certificate number: "ACLS987654321"
4. Select issuing organization: "American Heart Association"
5. Enter issue date: "2024-02-01"
6. Enter expiration date: "2026-02-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: ACLS certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-003: Add Valid PALS Certificate**
**Test ID**: TC-CERT-POS-003  
**Priority**: Medium  
**Description**: Test adding a valid Pediatric Advanced Life Support (PALS) certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Pediatric Advanced Life Support (PALS)" from certificate type dropdown
3. Enter certificate number: "PALS456789123"
4. Select issuing organization: "American Heart Association"
5. Enter issue date: "2024-03-01"
6. Enter expiration date: "2026-03-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: PALS certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-004: Add Valid CPR Certificate**
**Test ID**: TC-CERT-POS-004  
**Priority**: Medium  
**Description**: Test adding a valid CPR certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "CPR" from certificate type dropdown
3. Enter certificate number: "CPR789123456"
4. Select issuing organization: "Red Cross"
5. Enter issue date: "2024-04-01"
6. Enter expiration date: "2025-04-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: CPR certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-005: Add Valid Nursing Certificate**
**Test ID**: TC-CERT-POS-005  
**Priority**: High  
**Description**: Test adding a valid nursing specialty certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Critical Care Nursing" from certificate type dropdown
3. Enter certificate number: "CCN123789456"
4. Select issuing organization: "American Association of Critical-Care Nurses"
5. Enter issue date: "2024-05-01"
6. Enter expiration date: "2027-05-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: Nursing certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-006: Add Valid Specialty Certificate**
**Test ID**: TC-CERT-POS-006  
**Priority**: Medium  
**Description**: Test adding a valid specialty certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Trauma Nursing Core Course (TNCC)" from certificate type dropdown
3. Enter certificate number: "TNCC456123789"
4. Select issuing organization: "Emergency Nurses Association"
5. Enter issue date: "2024-06-01"
6. Enter expiration date: "2026-06-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: Specialty certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-007: Add Valid Continuing Education Certificate**
**Test ID**: TC-CERT-POS-007  
**Priority**: Low  
**Description**: Test adding a valid continuing education certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Continuing Education" from certificate type dropdown
3. Enter certificate number: "CE789456123"
4. Select issuing organization: "State Board of Nursing"
5. Enter issue date: "2024-07-01"
6. Enter expiration date: "2025-07-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: Continuing education certificate successfully added  
**Status**: ⏳ PENDING

---

### **TC-CERT-POS-008: Add Valid Professional Development Certificate**
**Test ID**: TC-CERT-POS-008  
**Priority**: Low  
**Description**: Test adding a valid professional development certificate  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Select "Professional Development" from certificate type dropdown
3. Enter certificate number: "PD123456789"
4. Select issuing organization: "Healthcare Professional Institute"
5. Enter issue date: "2024-08-01"
6. Enter expiration date: "2025-08-01"
7. Click "Add Certificate" button
8. Verify success message appears
9. Verify certificate is added to the list

**Expected Result**: Professional development certificate successfully added  
**Status**: ⏳ PENDING

---

## ❌ **NEGATIVE TEST CASES**

### **TC-CERT-NEG-001: Empty Certificate Type**
**Test ID**: TC-CERT-NEG-001  
**Priority**: High  
**Description**: Test adding certificate without selecting certificate type  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Leave Certificate Type field empty
2. Fill in other fields with valid data
3. Click "Add Certificate" button
4. Verify validation message appears

**Expected Result**: Validation message for required certificate type field  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-002: Empty Certificate Number**
**Test ID**: TC-CERT-NEG-002  
**Priority**: High  
**Description**: Test adding certificate without certificate number  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Leave Certificate Number field empty
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify validation message appears

**Expected Result**: Validation message for required certificate number field  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-003: Empty Issuing Organization**
**Test ID**: TC-CERT-NEG-003  
**Priority**: High  
**Description**: Test adding certificate without issuing organization  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter valid certificate number
3. Leave Issuing Organization field empty
4. Fill in other required fields
5. Click "Add Certificate" button
6. Verify validation message appears

**Expected Result**: Validation message for required issuing organization field  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-004: Invalid Certificate Number Format**
**Test ID**: TC-CERT-NEG-004  
**Priority**: Medium  
**Description**: Test adding certificate with invalid certificate number format  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter invalid certificate number: "INVALID123"
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify validation message appears

**Expected Result**: Validation message for invalid certificate number format  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-005: Invalid Issue Date Format**
**Test ID**: TC-CERT-NEG-005  
**Priority**: Medium  
**Description**: Test adding certificate with invalid issue date format  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter valid certificate number
3. Enter invalid issue date: "13/45/2024"
4. Fill in other required fields
5. Click "Add Certificate" button
6. Verify validation message appears

**Expected Result**: Validation message for invalid issue date format  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-006: Invalid Expiration Date Format**
**Test ID**: TC-CERT-NEG-006  
**Priority**: Medium  
**Description**: Test adding certificate with invalid expiration date format  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter valid certificate number
3. Enter valid issue date
4. Enter invalid expiration date: "13/45/2025"
5. Click "Add Certificate" button
6. Verify validation message appears

**Expected Result**: Validation message for invalid expiration date format  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-007: Past Expiration Date**
**Test ID**: TC-CERT-NEG-007  
**Priority**: Medium  
**Description**: Test adding certificate with past expiration date  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter valid certificate number
3. Enter valid issue date
4. Enter past expiration date: "2020-01-01"
5. Click "Add Certificate" button
6. Verify validation message appears

**Expected Result**: Validation message for past expiration date  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-008: Issue Date After Expiration Date**
**Test ID**: TC-CERT-NEG-008  
**Priority**: Medium  
**Description**: Test adding certificate with issue date after expiration date  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter valid certificate number
3. Enter issue date: "2025-01-01"
4. Enter expiration date: "2024-01-01"
5. Click "Add Certificate" button
6. Verify validation message appears

**Expected Result**: Validation message for invalid date range  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-009: Duplicate Certificate Number**
**Test ID**: TC-CERT-NEG-009  
**Priority**: High  
**Description**: Test adding certificate with duplicate certificate number  
**Preconditions**: User has already added a certificate with specific number  
**Test Steps**:
1. Try to add another certificate with same certificate number
2. Click "Add Certificate" button
3. Verify validation message appears
4. Verify duplicate certificate is not added

**Expected Result**: Validation message for duplicate certificate number  
**Status**: ⏳ PENDING

---

### **TC-CERT-NEG-010: Very Long Certificate Number**
**Test ID**: TC-CERT-NEG-010  
**Priority**: Low  
**Description**: Test adding certificate with very long certificate number  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter very long certificate number: "CERT123456789012345678901234567890"
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify validation message appears

**Expected Result**: Validation message for certificate number length limit  
**Status**: ⏳ PENDING

---

## 🔄 **CRUD OPERATIONS TEST CASES**

### **TC-CERT-CRUD-001: CREATE Certificate**
**Test ID**: TC-CERT-CRUD-001  
**Priority**: High  
**Description**: Test creating a new certificate (CREATE operation)  
**Preconditions**: User is logged in and on profile page  
**Test Steps**:
1. Click "Add Certificate" button
2. Fill in all required fields with valid data
3. Click "Add Certificate" button
4. Verify certificate is created successfully
5. Verify certificate appears in the list
6. Verify certificate count is updated

**Expected Result**: Certificate successfully created  
**Status**: ⏳ PENDING

---

### **TC-CERT-CRUD-002: READ Certificate**
**Test ID**: TC-CERT-CRUD-002  
**Priority**: High  
**Description**: Test viewing existing certificates (READ operation)  
**Preconditions**: User has certificates in the system  
**Test Steps**:
1. Navigate to Certificates section
2. Verify all certificates are displayed
3. Verify certificate information is correct
4. Verify edit/delete buttons are available

**Expected Result**: All certificates displayed correctly  
**Status**: ⏳ PENDING

---

### **TC-CERT-CRUD-003: UPDATE Certificate**
**Test ID**: TC-CERT-CRUD-003  
**Priority**: High  
**Description**: Test updating an existing certificate (UPDATE operation)  
**Preconditions**: User has certificates in the system  
**Test Steps**:
1. Click edit button on a certificate
2. Modify certificate information
3. Click "Update Certificate" button
4. Verify certificate is updated successfully
5. Verify changes are reflected in the list

**Expected Result**: Certificate successfully updated  
**Status**: ⏳ PENDING

---

### **TC-CERT-CRUD-004: DELETE Certificate**
**Test ID**: TC-CERT-CRUD-004  
**Priority**: High  
**Description**: Test deleting an existing certificate (DELETE operation)  
**Preconditions**: User has certificates in the system  
**Test Steps**:
1. Click delete button on a certificate
2. Confirm deletion in dialog
3. Verify certificate is deleted successfully
4. Verify certificate is removed from the list
5. Verify certificate count is updated

**Expected Result**: Certificate successfully deleted  
**Status**: ⏳ PENDING

---

## 🛡️ **SECURITY TEST CASES**

### **TC-CERT-SEC-001: XSS Attempt in Certificate Number**
**Test ID**: TC-CERT-SEC-001  
**Priority**: High  
**Description**: Test XSS attempt in certificate number field  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter XSS attempt in certificate number: "<script>alert('XSS')</script>"
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify XSS attempt is sanitized

**Expected Result**: XSS attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-CERT-SEC-002: SQL Injection Attempt**
**Test ID**: TC-CERT-SEC-002  
**Priority**: High  
**Description**: Test SQL injection attempt in certificate fields  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter SQL injection attempt: "'; DROP TABLE certificates; --"
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify SQL injection attempt is sanitized

**Expected Result**: SQL injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

### **TC-CERT-SEC-003: HTML Injection Attempt**
**Test ID**: TC-CERT-SEC-003  
**Priority**: Medium  
**Description**: Test HTML injection attempt in certificate fields  
**Preconditions**: Add Certificate pop-up is open  
**Test Steps**:
1. Select valid Certificate Type
2. Enter HTML injection attempt: "<img src=x onerror=alert('XSS')>"
3. Fill in other required fields
4. Click "Add Certificate" button
5. Verify HTML injection attempt is sanitized

**Expected Result**: HTML injection attempt is sanitized and not executed  
**Status**: ⏳ PENDING

---

## 📊 **Test Execution Plan**

### **Execution Order**
1. **Positive Test Cases** (TC-CERT-POS-001 to TC-CERT-POS-008)
2. **Negative Test Cases** (TC-CERT-NEG-001 to TC-CERT-NEG-010)
3. **CRUD Operations** (TC-CERT-CRUD-001 to TC-CERT-CRUD-004)
4. **Security Tests** (TC-CERT-SEC-001 to TC-CERT-SEC-003)

### **Test Data Requirements**
- **Valid Certificate Types**: BLS, ACLS, PALS, CPR, Nursing, Specialty, CE, Professional Development
- **Valid Certificate Numbers**: Various formats and lengths
- **Valid Organizations**: American Heart Association, Red Cross, AACN, ENA, etc.
- **Valid Dates**: Current and future dates in proper format
- **Invalid Data**: Empty fields, invalid formats, past dates, XSS/SQL injection attempts

### **Expected Outcomes**
- **Positive Tests**: Certificates added successfully with confirmation
- **Negative Tests**: Clear validation messages for invalid inputs
- **CRUD Operations**: All operations work correctly
- **Security Tests**: Proper sanitization of malicious input

## 🎯 **Success Criteria**

### **Positive Test Success**
- Certificates added successfully
- Confirmation messages displayed
- Certificate count updated
- Certificates displayed in list
- All fields populated correctly

### **Negative Test Success**
- Clear validation messages for invalid inputs
- Form submission prevented for invalid data
- User-friendly error messages
- Proper field highlighting for errors

### **CRUD Operations Success**
- Create: New certificates added successfully
- Read: All certificates displayed correctly
- Update: Certificate information updated successfully
- Delete: Certificates removed with confirmation

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
- [ ] Navigate to Certificates section
- [ ] Verify "Add Certificate" button is accessible

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

*Certificates test cases created using Chrome DevTools MCP for automated testing on January 2025*
