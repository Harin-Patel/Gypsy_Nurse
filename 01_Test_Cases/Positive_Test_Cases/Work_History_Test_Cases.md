# TGN Website Work History Test Cases

## Test Suite Overview
**Test Suite**: Work History Management  
**Total Test Cases**: 25 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Positive Test Cases** (10 test cases)
2. **Negative Test Cases** (10 test cases)
3. **Boundary Value Tests** (2 test cases)
4. **Security Tests** (3 test cases)

---

## ✅ **POSITIVE TEST CASES**

### **TC-WORK-POS-001: Add Valid Work History Entry**
**Test ID**: TC-WORK-POS-001  
**Priority**: High  
**Description**: Test adding a valid work history entry with all required fields.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Registered Nurse" into Job Title field.
2. Enter "General Hospital" into Company/Organization field.
3. Enter "2020-01-15" into Start Date field.
4. Enter "2023-12-31" into End Date field.
5. Enter "Provided direct patient care in medical-surgical unit" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added toast message displayed.
- New work history entry visible in the Work History section with correct details.
- "Add Work History" pop-up closes.
- Total Work History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-002: Add Valid Work History with Current Position**
**Test ID**: TC-WORK-POS-002  
**Priority**: High  
**Description**: Test adding a work history entry for a current position (no end date).  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Staff Nurse" into Job Title field.
2. Enter "City Medical Center" into Company/Organization field.
3. Enter "2022-06-01" into Start Date field.
4. Leave End Date field empty (current position).
5. Enter "Providing comprehensive nursing care in ICU" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added toast message displayed.
- New work history entry visible with "Present" as end date.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-003: Add Work History with Long Job Description**
**Test ID**: TC-WORK-POS-003  
**Priority**: Medium  
**Description**: Test adding a work history entry with a detailed job description.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Charge Nurse" into Job Title field.
2. Enter "Regional Healthcare System" into Company/Organization field.
3. Enter "2018-03-01" into Start Date field.
4. Enter "2021-08-15" into End Date field.
5. Enter a comprehensive job description (200+ characters).
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added with full job description displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-004: Add Multiple Work History Entries**
**Test ID**: TC-WORK-POS-004  
**Priority**: High  
**Description**: Test adding multiple work history entries sequentially.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Add first work history entry (TC-WORK-POS-001).
2. Add second work history entry (TC-WORK-POS-002).
3. Add third work history entry (TC-WORK-POS-003).
**Expected Result**:
- All work history entries added successfully and displayed in chronological order.
- Total Work History count reflects the total number of added entries.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-005: Edit Existing Work History**
**Test ID**: TC-WORK-POS-005  
**Priority**: High  
**Description**: Test editing an existing work history entry's details.  
**Preconditions**: At least one work history entry exists in the profile.  
**Test Steps**:
1. Click "Edit" button next to an existing work history entry.
2. Modify Job Title, Company, or Job Description.
3. Click "Update Work History" button.
**Expected Result**:
- Work history updated successfully toast message displayed.
- Work history details updated in the Work History section.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-006: Delete Existing Work History**
**Test ID**: TC-WORK-POS-006  
**Priority**: High  
**Description**: Test deleting an existing work history entry.  
**Preconditions**: At least one work history entry exists in the profile.  
**Test Steps**:
1. Click "Delete" button next to an existing work history entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Work history deleted successfully toast message displayed.
- Work history entry removed from the Work History section.
- Total Work History count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-007: Cancel Add Work History**
**Test ID**: TC-WORK-POS-007  
**Priority**: Low  
**Description**: Test canceling the "Add Work History" operation.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Fill some details in the form (e.g., Job Title, Company).
2. Click "Cancel" button.
**Expected Result**:
- "Add Work History" pop-up closes without adding an entry.
- No changes are made to the Work History list.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-008: Add Work History with Special Characters**
**Test ID**: TC-WORK-POS-008  
**Priority**: Low  
**Description**: Test adding a work history entry with special characters in company name.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "ICU Nurse" into Job Title field.
2. Enter "St. Mary's Medical Center & Research Institute" into Company/Organization field.
3. Enter "2019-01-01" into Start Date field.
4. Enter "2022-12-31" into End Date field.
5. Enter "Specialized in critical care nursing" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added with special characters preserved.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-009: Add Work History with Future Start Date**
**Test ID**: TC-WORK-POS-009  
**Priority**: Medium  
**Description**: Test adding a work history entry with a future start date (planned position).  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Travel Nurse" into Job Title field.
2. Enter "Healthcare Staffing Agency" into Company/Organization field.
3. Enter future date (e.g., "2025-03-01") into Start Date field.
4. Enter "2025-12-31" into End Date field.
5. Enter "Planned travel nursing assignment" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added with future dates.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-POS-010: Add Work History with Minimum Required Fields**
**Test ID**: TC-WORK-POS-010  
**Priority**: Medium  
**Description**: Test adding a work history entry with only the minimum required fields.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Leave Job Description field empty.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added with minimal information.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## ❌ **NEGATIVE TEST CASES**

### **TC-WORK-NEG-001: Empty Job Title**
**Test ID**: TC-WORK-NEG-001  
**Priority**: High  
**Description**: Attempt to add a work history entry without entering a job title.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Leave Job Title field empty.
2. Enter "General Hospital" into Company/Organization field.
3. Enter "2020-01-15" into Start Date field.
4. Enter "2023-12-31" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Job title is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-002: Empty Company/Organization**
**Test ID**: TC-WORK-NEG-002  
**Priority**: High  
**Description**: Attempt to add a work history entry without entering a company/organization.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Registered Nurse" into Job Title field.
2. Leave Company/Organization field empty.
3. Enter "2020-01-15" into Start Date field.
4. Enter "2023-12-31" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Company/Organization is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-003: Empty Start Date**
**Test ID**: TC-WORK-NEG-003  
**Priority**: High  
**Description**: Attempt to add a work history entry without entering a start date.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Staff Nurse" into Job Title field.
2. Enter "City Hospital" into Company/Organization field.
3. Leave Start Date field empty.
4. Enter "2023-12-31" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Start date is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-004: Invalid Date Format**
**Test ID**: TC-WORK-NEG-004  
**Priority**: Medium  
**Description**: Attempt to add a work history entry with invalid date format.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "15/01/2020" into Start Date field (DD/MM/YYYY format).
4. Enter "31/12/2023" into End Date field (DD/MM/YYYY format).
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Invalid date format" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-005: End Date Before Start Date**
**Test ID**: TC-WORK-NEG-005  
**Priority**: High  
**Description**: Attempt to add a work history entry with end date before start date.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2023-01-01" into Start Date field.
4. Enter "2022-12-31" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "End date cannot be before start date" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-006: Duplicate Work History Entry**
**Test ID**: TC-WORK-NEG-006  
**Priority**: High  
**Description**: Attempt to add a work history entry with the exact same details as an already existing entry.  
**Preconditions**: A work history entry already exists.  
**Test Steps**:
1. Enter the same Job Title, Company, Start Date, and End Date as an existing entry.
2. Click "Add Work History" button.
**Expected Result**:
- Error message "Work history with these details already exists" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-007: Very Long Job Title**
**Test ID**: TC-WORK-NEG-007  
**Priority**: Medium  
**Description**: Attempt to add a work history entry with an extremely long job title.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter a job title with 200+ characters.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Job title is too long" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-008: Very Long Company Name**
**Test ID**: TC-WORK-NEG-008  
**Priority**: Medium  
**Description**: Attempt to add a work history entry with an extremely long company name.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter a company name with 200+ characters.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Validation message "Company name is too long" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-009: Edit with Invalid Dates**
**Test ID**: TC-WORK-NEG-009  
**Priority**: High  
**Description**: Attempt to edit an existing work history entry with invalid date combinations.  
**Preconditions**: Edit Work History pop-up is open with an existing entry.  
**Test Steps**:
1. Modify Start Date to be after End Date.
2. Click "Update Work History" button.
**Expected Result**:
- Validation message "Start date cannot be after end date" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-010: Edit with Empty Required Fields**
**Test ID**: TC-WORK-NEG-010  
**Priority**: High  
**Description**: Attempt to edit an existing work history entry by clearing required fields.  
**Preconditions**: Edit Work History pop-up is open with an existing entry.  
**Test Steps**:
1. Clear Job Title field.
2. Click "Update Work History" button.
**Expected Result**:
- Validation message "Job title is required" displayed.
- Form submission prevented.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🧪 **BOUNDARY VALUE TESTS**

### **TC-WORK-BVT-001: Minimum Length Job Title**
**Test ID**: TC-WORK-BVT-001  
**Priority**: Low  
**Description**: Test adding a work history entry with the minimum allowed length for job title (e.g., 1 character).  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "N" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added if 1 character is valid, or validation message if minimum length is higher.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-BVT-002: Maximum Length Job Description**
**Test ID**: TC-WORK-BVT-002  
**Priority**: Low  
**Description**: Test adding a work history entry with the maximum allowed length for job description.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter a job description with maximum allowed characters.
6. Click "Add Work History" button.
**Expected Result**:
- Work history successfully added if maximum length is valid, or truncation/validation message if maximum length is exceeded.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔒 **SECURITY TESTS**

### **TC-WORK-SEC-001: XSS Attempt in Job Title**
**Test ID**: TC-WORK-SEC-001  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the Job Title field.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter `<script>alert('XSS')</script>` into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Work history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-SEC-002: XSS Attempt in Job Description**
**Test ID**: TC-WORK-SEC-002  
**Priority**: Critical  
**Description**: Attempt to inject a Cross-Site Scripting (XSS) payload into the Job Description field.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter "Nurse" into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter `<script>alert('XSS')</script>` into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution.
- Work history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-SEC-003: SQL Injection Attempt in Job Title**
**Test ID**: TC-WORK-SEC-003  
**Priority**: High  
**Description**: Attempt to inject a SQL Injection payload into the Job Title field.  
**Preconditions**: Add Work History pop-up is open.  
**Test Steps**:
1. Enter `' OR '1'='1` into Job Title field.
2. Enter "Hospital" into Company/Organization field.
3. Enter "2020-01-01" into Start Date field.
4. Enter "2021-01-01" into End Date field.
5. Enter "Nursing duties" into Job Description field.
6. Click "Add Work History" button.
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation.
- Work history should be added with sanitized text or submission prevented with an error.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A
