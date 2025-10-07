# TGN Website Education History CRUD Test Cases

## Test Suite Overview
**Test Suite**: Education History Management - CRUD Operations  
**Total Test Cases**: 8 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **CREATE Operations** (3 test cases)
2. **READ Operations** (1 test case)
3. **UPDATE Operations** (2 test cases)
4. **DELETE Operations** (2 test cases)

---

## ✅ **CRUD TEST CASES**

### **TC-EDU-CRUD-001: CREATE - Add First Education History**
**Test ID**: TC-EDU-CRUD-001  
**Priority**: High  
**Description**: Test creating a new education history entry with all required fields.  
**Preconditions**: User is logged in and on the profile page.  
**Test Steps**:
1. Navigate to profile page and access Education History section.
2. Click "Add Your First Education" button to open "Add New Education History" pop-up.
3. Select "Augusta University" from School Name dropdown.
4. Select "Nursing" from Course of Study dropdown.
5. Check "Did you Graduate?" checkbox.
6. Enter "2022-05-15" into Graduation Date field.
7. Select "Bachelor of Science" from Degree dropdown.
8. Click "Add Education History" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education entry visible in the Education History section with correct details.
- "Add New Education History" pop-up closes.
- Total Education History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-002: CREATE - Add Second Education History**
**Test ID**: TC-EDU-CRUD-002  
**Priority**: High  
**Description**: Test creating a second education history entry.  
**Preconditions**: At least one education history already exists.  
**Test Steps**:
1. Click "Add Education" button to open "Add New Education History" pop-up.
2. Select "Emory University" from School Name dropdown.
3. Select "Nursing" from Course of Study dropdown.
4. Check "Did you Graduate?" checkbox.
5. Enter "2020-05-20" into Graduation Date field.
6. Select "Master of Science" from Degree dropdown.
7. Click "Add Education History" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education entry visible in the Education History section.
- Total Education History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-003: CREATE - Add Third Education History (Not Graduated)**
**Test ID**: TC-EDU-CRUD-003  
**Priority**: Medium  
**Description**: Test creating a third education history entry without graduation.  
**Preconditions**: At least two education histories already exist.  
**Test Steps**:
1. Click "Add Education" button to open "Add New Education History" pop-up.
2. Select "Georgia State University" from School Name dropdown.
3. Select "Nursing" from Course of Study dropdown.
4. Leave "Did you Graduate?" checkbox unchecked.
5. Click "Add Education History" button.
**Expected Result**:
- Education history successfully added toast message displayed.
- New education entry visible in the Education History section.
- Total Education History count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-004: READ - View Education History Details**
**Test ID**: TC-EDU-CRUD-004  
**Priority**: High  
**Description**: Test reading (verifying) education history entries and their details.  
**Preconditions**: At least one education history exists.  
**Test Steps**:
1. Navigate to Education History section.
2. Verify all education entries are displayed with correct information.
3. Check that education details are accurate and complete.
**Expected Result**:
- All education history entries are visible with correct details.
- Education information is displayed accurately.
- No missing or incorrect data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-005: UPDATE - Edit Education History Details**
**Test ID**: TC-EDU-CRUD-005  
**Priority**: High  
**Description**: Test editing an existing education history entry's details.  
**Preconditions**: At least one education history exists.  
**Test Steps**:
1. Click the "Edit" button next to the first education entry.
2. Change School Name to "Georgia Institute of Technology".
3. Change Course of Study to "Healthcare Administration".
4. Modify Graduation Date to "2023-05-15".
5. Change Degree to "Master of Healthcare Administration".
6. Click "Update Education History" button.
**Expected Result**:
- Education history updated successfully toast message displayed.
- Education entry details updated in the Education History section.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-006: UPDATE - Edit Graduation Status**
**Test ID**: TC-EDU-CRUD-006  
**Priority**: Medium  
**Description**: Test editing a education history's graduation status.  
**Preconditions**: At least one education history exists.  
**Test Steps**:
1. Click the "Edit" button next to the second education entry.
2. Uncheck "Did you Graduate?" checkbox.
3. Clear the Graduation Date field.
4. Clear the Degree field.
5. Click "Update Education History" button.
**Expected Result**:
- Education history updated successfully toast message displayed.
- Education entry updated to show "Not Graduated" status.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-007: DELETE - Remove Education History**
**Test ID**: TC-EDU-CRUD-007  
**Priority**: High  
**Description**: Test deleting an existing education history entry.  
**Preconditions**: At least one education history exists.  
**Test Steps**:
1. Click the "Delete" button next to the first education entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Education history deleted successfully toast message displayed.
- Education entry removed from the Education History section.
- Total Education History count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EDU-CRUD-008: DELETE - Remove Another Education History**
**Test ID**: TC-EDU-CRUD-008  
**Priority**: Medium  
**Description**: Test deleting another education history entry.  
**Preconditions**: At least one education history exists.  
**Test Steps**:
1. Click the "Delete" button next to the second education entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Education history deleted successfully toast message displayed.
- Education entry removed from the Education History section.
- Total Education History count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 8
- **CREATE Operations**: 3 test cases
- **READ Operations**: 1 test case
- **UPDATE Operations**: 2 test cases
- **DELETE Operations**: 2 test cases

### **Expected Outcomes**
- All CRUD operations work correctly with proper validation
- Education history management provides complete functionality
- User experience remains smooth across all operations
- Data integrity is maintained throughout all operations

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All CRUD test cases execute successfully
- Education history management works reliably
- Data persistence is maintained across operations
- User interface responds appropriately to all actions
- Screenshots captured for all test executions
- Comprehensive test reports generated

### **Test Data Requirements**
- Valid school names (Augusta University, Emory University, Georgia State University)
- Valid course of study options (Nursing, Healthcare Administration)
- Valid graduation dates (past dates)
- Valid degree options (Bachelor of Science, Master of Science, Master of Healthcare Administration)
- Test data for editing and updating operations

### **Expected Screenshots**
- Education history creation forms
- Education listing with entries
- Education editing forms
- Education deletion confirmations
- Success/error toast messages
- Updated education listings
