# TGN Website Professional References Test Cases

## Test Suite Overview
**Test Suite**: Professional References Management  
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

### **TC-REF-POS-001: Add Valid Professional Reference (Supervisor)**
**Test ID**: TC-REF-POS-001  
**Priority**: High  
**Description**: Test adding a valid professional reference with all required fields for a supervisor.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Dr. Johnson was my direct supervisor for 3 years and can attest to my clinical skills, leadership abilities, and professional growth. She has extensive knowledge of my performance in critical care settings." into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added toast message displayed.
- New professional reference entry visible in the Professional References section with correct details.
- "Add New Professional Reference" pop-up closes.
- Total Professional References count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-002: Add Valid Professional Reference (Colleague)**
**Test ID**: TC-REF-POS-002  
**Priority**: Medium  
**Description**: Test adding a valid professional reference for a colleague.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Michael Chen" into Name field.
2. Enter "michael.chen@nursing.org" into Email field.
3. Enter "+1-555-987-6543" into Phone Number field.
4. Select "Colleague" from Relationship dropdown.
5. Enter "Senior Staff Nurse" into Title field.
6. Enter "Regional Medical Center" into Organization field.
7. Enter "Michael and I worked together on the ICU team for 2 years. He can speak to my teamwork, clinical expertise, and patient care skills." into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added toast message displayed.
- New professional reference entry visible in the Professional References section with correct details.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-003: Add Professional Reference (Professor)**
**Test ID**: TC-REF-POS-003  
**Priority**: Medium  
**Description**: Test adding a professional reference for a professor/educator.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Prof. Emily Rodriguez" into Name field.
2. Enter "emily.rodriguez@university.edu" into Email field.
3. Enter "+1-555-456-7890" into Phone Number field.
4. Select "Professor" from Relationship dropdown.
5. Enter "Nursing Professor" into Title field.
6. Enter "State University" into Organization field.
7. Enter "Professor Rodriguez was my academic advisor and can attest to my academic performance, research skills, and professional development during my nursing program." into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added toast message displayed.
- New professional reference entry visible with professor details.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-004: Edit Existing Professional Reference**
**Test ID**: TC-REF-POS-004  
**Priority**: High  
**Description**: Test editing an existing professional reference's details.  
**Preconditions**: At least one professional reference entry exists in the profile.  
**Test Steps**:
1. Click "Edit" button next to an existing professional reference entry.
2. Modify the Reference Notes field to "UPDATED: Dr. Johnson was my direct supervisor for 3 years and can attest to my clinical skills, leadership abilities, and professional growth. She has extensive knowledge of my performance in critical care settings. Added: She also supervised my transition to charge nurse role."
3. Click "Update Professional Reference" button.
**Expected Result**:
- Professional reference updated successfully toast message displayed.
- Professional reference entry details updated in the Professional References section.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-005: Delete Existing Professional Reference**
**Test ID**: TC-REF-POS-005  
**Priority**: High  
**Description**: Test deleting an existing professional reference entry.  
**Preconditions**: At least one professional reference entry exists in the profile.  
**Test Steps**:
1. Click "Delete" button next to an existing professional reference entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Professional reference deleted successfully toast message displayed.
- Professional reference entry removed from the Professional References section.
- Total Professional References count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-006: Add Professional Reference (Mentor)**
**Test ID**: TC-REF-POS-006  
**Priority**: Low  
**Description**: Test adding a professional reference for a mentor.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Lisa Thompson" into Name field.
2. Enter "lisa.thompson@healthcare.org" into Email field.
3. Enter "+1-555-321-9876" into Phone Number field.
4. Select "Mentor" from Relationship dropdown.
5. Enter "Senior Clinical Specialist" into Title field.
6. Enter "Healthcare Excellence Institute" into Organization field.
7. Enter "Lisa has been my professional mentor for 4 years, guiding my career development and providing valuable insights into advanced nursing practice." into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added toast message displayed.
- New entry visible with mentor relationship indicated.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-007: Add Professional Reference (Manager)**
**Test ID**: TC-REF-POS-007  
**Priority**: Low  
**Description**: Test adding a professional reference for a manager.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Robert Martinez" into Name field.
2. Enter "robert.martinez@clinic.com" into Email field.
3. Enter "+1-555-654-3210" into Phone Number field.
4. Select "Manager" from Relationship dropdown.
5. Enter "Nursing Manager" into Title field.
6. Enter "Community Health Clinic" into Organization field.
7. Enter "Robert managed our nursing team and can speak to my leadership skills, patient care excellence, and team collaboration abilities." into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added toast message displayed.
- New entry visible with manager relationship indicated.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-POS-008: Cancel Add Professional Reference**
**Test ID**: TC-REF-POS-008  
**Priority**: Low  
**Description**: Test canceling the "Add New Professional Reference" operation.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Fill some details in the form (e.g., enter Name).
2. Click "Cancel" button.
**Expected Result**:
- "Add New Professional Reference" pop-up closes without adding a professional reference entry.
- No changes are made to the Professional References list.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## ❌ **NEGATIVE TEST CASES**

### **TC-REF-NEG-001: Empty Name Field**
**Test ID**: TC-REF-NEG-001  
**Priority**: High  
**Description**: Attempt to add a professional reference without entering a name.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Leave Name field empty.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-002: Empty Email Field**
**Test ID**: TC-REF-NEG-002  
**Priority**: High  
**Description**: Attempt to add a professional reference without entering an email.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Leave Email field empty.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Email is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-003: Invalid Email Format**
**Test ID**: TC-REF-NEG-003  
**Priority**: High  
**Description**: Attempt to add a professional reference with an invalid email format.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "invalid-email-format" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Invalid email format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-004: Empty Phone Number Field**
**Test ID**: TC-REF-NEG-004  
**Priority**: High  
**Description**: Attempt to add a professional reference without entering a phone number.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Leave Phone Number field empty.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Phone number is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-005: Empty Relationship Selection**
**Test ID**: TC-REF-NEG-005  
**Priority**: High  
**Description**: Attempt to add a professional reference without selecting a relationship.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Leave Relationship dropdown empty.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Relationship is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-006: XSS Attempt in Name Field**
**Test ID**: TC-REF-NEG-006  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the Name field.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter `<script>alert('XSS')</script>` into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Professional reference should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-007: SQL Injection Attempt in Email Field**
**Test ID**: TC-REF-NEG-007  
**Priority**: High  
**Description**: Attempt to inject a SQL Injection payload into the Email field.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter `' OR '1'='1` into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation.
- Professional reference should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-NEG-008: Invalid Phone Number Format**
**Test ID**: TC-REF-NEG-008  
**Priority**: Medium  
**Description**: Attempt to add a professional reference with an invalid phone number format.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "invalid-phone" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Validation message "Invalid phone number format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔢 **BOUNDARY VALUE TESTS**

### **TC-REF-BV-001: Maximum Length Name Field**
**Test ID**: TC-REF-BV-001  
**Priority**: Medium  
**Description**: Test adding a professional reference with maximum length name.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter a very long name (e.g., 255 characters) into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added or appropriate length validation message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-BV-002: Maximum Length Reference Notes**
**Test ID**: TC-REF-BV-002  
**Priority**: Medium  
**Description**: Test adding a professional reference with maximum length reference notes.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter a very long reference notes text (e.g., 1000 characters) into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- Professional reference successfully added or appropriate length validation message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔒 **SECURITY TESTS**

### **TC-REF-SEC-001: XSS Attempt in Reference Notes Field**
**Test ID**: TC-REF-SEC-001  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the Reference Notes field.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter "City General Hospital" into Organization field.
7. Enter `<script>alert('XSS')</script>` into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Professional reference should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REF-SEC-002: SQL Injection Attempt in Organization Field**
**Test ID**: TC-REF-SEC-002  
**Priority**: High  
**Description**: Attempt to inject a SQL Injection payload into the Organization field.  
**Preconditions**: Add New Professional Reference pop-up is open.  
**Test Steps**:
1. Enter "Dr. Sarah Johnson" into Name field.
2. Enter "sarah.johnson@hospital.com" into Email field.
3. Enter "+1-555-123-4567" into Phone Number field.
4. Select "Supervisor" from Relationship dropdown.
5. Enter "Chief Nursing Officer" into Title field.
6. Enter `'; DROP TABLE references; --` into Organization field.
7. Enter "Test reference notes" into Reference Notes field.
8. Click "Add Professional Reference" button.
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation.
- Professional reference should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 20
- **Positive Test Cases**: 8
- **Negative Test Cases**: 8
- **Boundary Value Tests**: 2
- **Security Tests**: 2

### **Expected Outcomes**
- All positive test cases should pass with successful professional reference management
- All negative test cases should fail gracefully with appropriate validation messages
- Boundary value tests should handle edge cases appropriately
- Security tests should prevent malicious input and protect against XSS and SQL injection
- User experience should remain smooth with clear error messaging

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All positive test cases execute successfully
- All negative test cases show appropriate validation errors
- Form submission is prevented for invalid data
- Security tests prevent malicious input
- Screenshots captured for all test executions
- Comprehensive test reports generated
