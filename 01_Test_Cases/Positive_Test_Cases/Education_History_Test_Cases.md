# TGN Website Education History Test Cases

## Test Suite Overview
**Test Suite**: Education History Management  
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

### **TC-EDU-POS-001: Add Valid Education History (Bachelor's Degree)**
**Test ID**: TC-EDU-POS-001  
**Priority**: High  
**Description**: Test adding a valid education history entry for a Bachelor's degree with all required fields.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Comprehensive nursing program covering medical-surgical, pediatric, psychiatric, and community health nursing. Clinical rotations in various healthcare settings including hospitals, clinics, and community health centers." into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education history entry visible in the Education History section with correct details.
- "Add New Education" pop-up closes.
- Total Education History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-002: Add Valid Education History (Master's Degree)**
**Test ID**: TC-EDU-POS-002  
**Priority**: Medium  
**Description**: Test adding a valid education history entry for a Master's degree.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Master's Degree" from Degree Type dropdown.
2. Enter "Master of Science in Nursing" into Degree Name field.
3. Enter "Johns Hopkins University" into Institution Name field.
4. Enter "2022-09-01" into Start Date field.
5. Enter "2024-05-31" into End Date field.
6. Enter "3.9" into GPA field.
7. Enter "Advanced practice nursing program with focus on clinical leadership and evidence-based practice. Specialized coursework in healthcare policy, research methods, and advanced clinical assessment." into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education history entry visible in the Education History section with correct details.
- "Add New Education" pop-up closes.
- Total Education History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-003: Add Education History (Currently Enrolled)**
**Test ID**: TC-EDU-POS-003  
**Priority**: Medium  
**Description**: Test adding an education history entry for a current enrollment using "Currently enrolled" checkbox.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Doctorate" from Degree Type dropdown.
2. Enter "Doctor of Nursing Practice" into Degree Name field.
3. Enter "Columbia University" into Institution Name field.
4. Enter "2024-09-01" into Start Date field.
5. Check "Currently enrolled" checkbox (End Date should be disabled/cleared).
6. Enter "4.0" into GPA field.
7. Enter "Doctoral program focusing on advanced clinical practice, healthcare leadership, and evidence-based research. Specialization in healthcare systems improvement and patient outcomes." into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education history entry visible with "Present" or similar for End Date.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-004: Edit Existing Education History**
**Test ID**: TC-EDU-POS-004  
**Priority**: High  
**Description**: Test editing an existing education history entry's details.  
**Preconditions**: At least one education history entry exists in the profile.  
**Test Steps**:
1. Click "Edit" button next to an existing education history entry.
2. Modify the GPA field to "3.9".
3. Update the Description field to "UPDATED: Comprehensive nursing program covering medical-surgical, pediatric, psychiatric, and community health nursing. Clinical rotations in various healthcare settings including hospitals, clinics, and community health centers. Added research project in community health outcomes."
4. Click "Update Education" button.
**Expected Result**:
- Education history updated successfully toast message displayed.
- Education history entry details updated in the Education History section.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-005: Delete Existing Education History**
**Test ID**: TC-EDU-POS-005  
**Priority**: High  
**Description**: Test deleting an existing education history entry.  
**Preconditions**: At least one education history entry exists in the profile.  
**Test Steps**:
1. Click "Delete" button next to an existing education history entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Education history deleted successfully toast message displayed.
- Education history entry removed from the Education History section.
- Total Education History count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-006: Add Education History (Associate Degree)**
**Test ID**: TC-EDU-POS-006  
**Priority**: Low  
**Description**: Test adding an education history entry for an Associate degree.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Associate Degree" from Degree Type dropdown.
2. Enter "Associate of Science in Nursing" into Degree Name field.
3. Enter "Community College of Philadelphia" into Institution Name field.
4. Enter "2016-09-01" into Start Date field.
5. Enter "2018-05-31" into End Date field.
6. Enter "3.7" into GPA field.
7. Enter "Two-year nursing program providing foundational knowledge in nursing fundamentals, pharmacology, and clinical practice. Clinical experience in medical-surgical and pediatric units." into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New entry visible with Associate degree details.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-007: Add Education History (Certificate Program)**
**Test ID**: TC-EDU-POS-007  
**Priority**: Low  
**Description**: Test adding an education history entry for a certificate program.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Certificate" from Degree Type dropdown.
2. Enter "Critical Care Nursing Certificate" into Degree Name field.
3. Enter "American Association of Critical-Care Nurses" into Institution Name field.
4. Enter "2023-01-15" into Start Date field.
5. Enter "2023-06-15" into End Date field.
6. Enter "4.0" into GPA field.
7. Enter "Specialized certificate program in critical care nursing covering advanced cardiac life support, mechanical ventilation, and hemodynamic monitoring." into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New entry visible with Certificate program details.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-POS-008: Cancel Add Education History**
**Test ID**: TC-EDU-POS-008  
**Priority**: Low  
**Description**: Test canceling the "Add New Education" operation.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Fill some details in the form (e.g., select Degree Type).
2. Click "Cancel" button.
**Expected Result**:
- "Add New Education" pop-up closes without adding an education history entry.
- No changes are made to the Education History list.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## ❌ **NEGATIVE TEST CASES**

### **TC-EDU-NEG-001: Empty Degree Type**
**Test ID**: TC-EDU-NEG-001  
**Priority**: High  
**Description**: Attempt to add an education history entry without selecting a degree type.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Leave Degree Type field empty.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description for negative test case" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "Degree type is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-002: Empty Degree Name**
**Test ID**: TC-EDU-NEG-002  
**Priority**: High  
**Description**: Attempt to add an education history entry without entering a degree name.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Leave Degree Name field empty.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description for negative test case" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "Degree name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-003: Empty Institution Name**
**Test ID**: TC-EDU-NEG-003  
**Priority**: High  
**Description**: Attempt to add an education history entry without entering an institution name.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Leave Institution Name field empty.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description for negative test case" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "Institution name is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-004: Empty Start Date**
**Test ID**: TC-EDU-NEG-004  
**Priority**: High  
**Description**: Attempt to add an education history entry without entering a start date.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Leave Start Date field empty.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description for negative test case" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "Start date is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-005: End Date Before Start Date**
**Test ID**: TC-EDU-NEG-005  
**Priority**: High  
**Description**: Attempt to add an education history entry where the end date is before the start date.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2022-09-01" into Start Date field.
5. Enter "2018-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description for negative test case" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "End date cannot be before start date" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-006: Invalid GPA Format**
**Test ID**: TC-EDU-NEG-006  
**Priority**: Medium  
**Description**: Attempt to add an education history entry with an invalid GPA format.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "A+" into GPA field (invalid format).
7. Enter "Test description" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Validation message "Invalid GPA format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-007: XSS Attempt in Description Field**
**Test ID**: TC-EDU-NEG-007  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the Description field.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter `<script>alert('XSS')</script>` into Description field.
8. Click "Add Education" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Education history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-NEG-008: SQL Injection Attempt in Institution Name Field**
**Test ID**: TC-EDU-NEG-008  
**Priority**: High  
**Description**: Attempt to inject a SQL Injection payload into the Institution Name field.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter `' OR '1'='1` into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation.
- Education history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔢 **BOUNDARY VALUE TESTS**

### **TC-EDU-BOUND-001: Maximum GPA Value**
**Test ID**: TC-EDU-BOUND-001  
**Priority**: Medium  
**Description**: Test adding an education history entry with the maximum valid GPA value.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "4.0" into GPA field (maximum valid GPA).
7. Enter "Test description for boundary test" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added with maximum GPA value.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-BOUND-002: Minimum GPA Value**
**Test ID**: TC-EDU-BOUND-002  
**Priority**: Medium  
**Description**: Test adding an education history entry with the minimum valid GPA value.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "0.0" into GPA field (minimum valid GPA).
7. Enter "Test description for boundary test" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- Education history successfully added with minimum GPA value.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔒 **SECURITY TESTS**

### **TC-EDU-SEC-001: XSS Prevention in Degree Name Field**
**Test ID**: TC-EDU-SEC-001  
**Priority**: Critical  
**Description**: Test XSS prevention in the Degree Name field.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter `<script>alert('XSS')</script>` into Degree Name field.
3. Enter "University of California, Los Angeles" into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Education history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-SEC-002: SQL Injection Prevention in Institution Name Field**
**Test ID**: TC-EDU-SEC-002  
**Priority**: High  
**Description**: Test SQL injection prevention in the Institution Name field.  
**Preconditions**: Add New Education pop-up is open.  
**Test Steps**:
1. Select "Bachelor's Degree" from Degree Type dropdown.
2. Enter "Bachelor of Science in Nursing" into Degree Name field.
3. Enter `'; DROP TABLE education; --` into Institution Name field.
4. Enter "2018-09-01" into Start Date field.
5. Enter "2022-05-31" into End Date field.
6. Enter "3.8" into GPA field.
7. Enter "Test description" into Description field.
8. Click "Add Education" button.
**Expected Result**:
- SQL injection payload should be sanitized or escaped, preventing database manipulation.
- Education history should be added with sanitized text or submission prevented with an error.
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
- All positive test cases should pass, demonstrating proper functionality
- All negative test cases should fail gracefully with appropriate validation messages
- Boundary value tests should handle edge cases correctly
- Security tests should prevent malicious input and protect against XSS and SQL injection

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All positive test cases execute successfully
- All negative test cases show appropriate validation errors
- All boundary value tests handle edge cases correctly
- All security tests prevent malicious input
- Screenshots captured for all test executions
- Comprehensive test reports generated
