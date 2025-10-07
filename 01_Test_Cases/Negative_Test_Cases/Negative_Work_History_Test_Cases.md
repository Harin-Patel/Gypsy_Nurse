# TGN Website Negative Work History Test Cases

## Test Suite Overview
**Test Suite**: Work History Management - Negative Scenarios  
**Total Test Cases**: 12 negative test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## ❌ **NEGATIVE TEST CASES**

### **TC-WORK-NEG-001: Empty Employer Selection**
**Test ID**: TC-WORK-NEG-001  
**Priority**: High  
**Description**: Attempt to add work history without selecting an employer  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Leave Employer Full Name field empty
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "Employer is required" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-002: Empty Unit Selection**
**Test ID**: TC-WORK-NEG-002  
**Priority**: High  
**Description**: Attempt to add work history without selecting a unit  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Leave Unit field empty
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "Unit is required" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-003: Empty Start Date**
**Test ID**: TC-WORK-NEG-003  
**Priority**: High  
**Description**: Attempt to add work history without entering a start date  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Leave Start Date field empty
4. Enter "2024-12-31" into End Date field
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "Start date is required" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-004: Start Date in the Future**
**Test ID**: TC-WORK-NEG-004  
**Priority**: High  
**Description**: Attempt to add work history with a start date in the future  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter future date (e.g., "2026-01-15") into Start Date field
4. Enter "2027-12-31" into End Date field
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "Start date cannot be in the future" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-005: End Date Before Start Date**
**Test ID**: TC-WORK-NEG-005  
**Priority**: High  
**Description**: Attempt to add work history with end date before start date  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2022-12-31" into End Date field
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "End date cannot be before start date" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-006: Invalid Date Format**
**Test ID**: TC-WORK-NEG-006  
**Priority**: Medium  
**Description**: Attempt to add work history with invalid date format  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "15/01/2023" into Start Date field (invalid format)
4. Enter "31/12/2024" into End Date field (invalid format)
5. Enter description in Description field
6. Click "Add Work History" button
**Expected Result**:
- Validation message "Invalid date format" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-007: Travel Assignment Without Staffing Agency**
**Test ID**: TC-WORK-NEG-007  
**Priority**: High  
**Description**: Attempt to add work history with travel assignment checked but no staffing agency name  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter description in Description field
6. Check "Travel Assignment" checkbox
7. Leave Staffing Agency Name field empty
8. Click "Add Work History" button
**Expected Result**:
- Validation message "Staffing agency name is required for travel assignments" displayed
- Form submission prevented
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-008: XSS Attempt in Description**
**Test ID**: TC-WORK-NEG-008  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload into the Description field  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter `<script>alert('XSS')</script>` into Description field
6. Click "Add Work History" button
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution
- Work history should be added with sanitized text or submission prevented with an error
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-009: XSS Attempt in Staffing Agency Name**
**Test ID**: TC-WORK-NEG-009  
**Priority**: Critical  
**Description**: Attempt to inject XSS payload into the Staffing Agency Name field  
**Preconditions**: Add New Work History pop-up is open, Travel Assignment checked  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter description in Description field
6. Check "Travel Assignment" checkbox
7. Enter `<script>alert('XSS')</script>` into Staffing Agency Name field
8. Click "Add Work History" button
**Expected Result**:
- XSS payload should be sanitized or encoded, preventing script execution
- Work history should be added with sanitized text or submission prevented with an error
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-010: SQL Injection Attempt in Description**
**Test ID**: TC-WORK-NEG-010  
**Priority**: High  
**Description**: Attempt to inject SQL Injection payload into the Description field  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter `'; DROP TABLE work_history; --` into Description field
6. Click "Add Work History" button
**Expected Result**:
- SQL Injection payload should be sanitized or escaped, preventing database manipulation
- Work history should be added with sanitized text or submission prevented with an error
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-011: Extremely Long Description**
**Test ID**: TC-WORK-NEG-011  
**Priority**: Medium  
**Description**: Attempt to add work history with an extremely long description  
**Preconditions**: Add New Work History pop-up is open  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter a 10,000+ character description
6. Click "Add Work History" button
**Expected Result**:
- Either description is truncated to maximum length, or validation message "Description is too long" displayed
- Form submission handled appropriately
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-WORK-NEG-012: Duplicate Work History Entry**
**Test ID**: TC-WORK-NEG-012  
**Priority**: High  
**Description**: Attempt to add a work history entry with the exact same details as an existing entry  
**Preconditions**: A work history entry (Community Hospital, Acute Care, 2023-01-15 to 2024-12-31) already exists  
**Test Steps**:
1. Select "Community Hospital" from Employer Full Name dropdown
2. Select "Acute Care" from Unit dropdown
3. Enter "2023-01-15" into Start Date field
4. Enter "2024-12-31" into End Date field
5. Enter the same description as existing entry
6. Check "Travel Assignment" checkbox
7. Enter "Travel Nurse Solutions" into Staffing Agency Name field
8. Click "Add Work History" button
**Expected Result**:
- Error message "Work history with these details already exists" (or similar) displayed
- Form submission prevented or existing entry updated (if update is intended behavior for duplicates)
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A
