# TGN Website Certification Specialties CRUD Test Cases

## Test Suite Overview
**Test Suite**: Certification Specialties Management - CRUD Operations  
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

### **TC-SPEC-CRUD-001: CREATE - Add First Certification Specialty**
**Test ID**: TC-SPEC-CRUD-001  
**Priority**: High  
**Description**: Test creating a new certification specialty entry with all required fields.  
**Preconditions**: User is logged in and on the profile page.  
**Test Steps**:
1. Navigate to profile page and access Certification Specialties section.
2. Click "Add Your First Specialty" button to open "Add New Certification Specialty" pop-up.
3. Enter "Critical Care Nursing" into Specialty Name field.
4. Enter "American Association of Critical-Care Nurses" into Certification Body field.
5. Enter "2023-06-15" into Certification Date field.
6. Click "Add Specialty" button.
**Expected Result**:
- Certification specialty successfully added toast message displayed.
- New specialty entry visible in the Certification Specialties section with correct details.
- "Add New Certification Specialty" pop-up closes.
- Total Certification Specialties count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-002: CREATE - Add Second Certification Specialty**
**Test ID**: TC-SPEC-CRUD-002  
**Priority**: High  
**Description**: Test creating a second certification specialty entry.  
**Preconditions**: At least one certification specialty already exists.  
**Test Steps**:
1. Click "Add Specialty" button to open "Add New Certification Specialty" pop-up.
2. Enter "Emergency Nursing" into Specialty Name field.
3. Enter "Emergency Nurses Association" into Certification Body field.
4. Enter "2023-08-20" into Certification Date field.
5. Click "Add Specialty" button.
**Expected Result**:
- Certification specialty successfully added toast message displayed.
- New specialty entry visible in the Certification Specialties section.
- Total Certification Specialties count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-003: CREATE - Add Third Certification Specialty**
**Test ID**: TC-SPEC-CRUD-003  
**Priority**: Medium  
**Description**: Test creating a third certification specialty entry.  
**Preconditions**: At least two certification specialties already exist.  
**Test Steps**:
1. Click "Add Specialty" button to open "Add New Certification Specialty" pop-up.
2. Enter "Oncology Nursing" into Specialty Name field.
3. Enter "Oncology Nursing Society" into Certification Body field.
4. Enter "2023-09-10" into Certification Date field.
5. Click "Add Specialty" button.
**Expected Result**:
- Certification specialty successfully added toast message displayed.
- New specialty entry visible in the Certification Specialties section.
- Total Certification Specialties count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-004: READ - View Certification Specialty Details**
**Test ID**: TC-SPEC-CRUD-004  
**Priority**: High  
**Description**: Test reading (verifying) certification specialty entries and their details.  
**Preconditions**: At least one certification specialty exists.  
**Test Steps**:
1. Navigate to Certification Specialties section.
2. Verify all specialty entries are displayed with correct information.
3. Check that specialty details are accurate and complete.
**Expected Result**:
- All certification specialty entries are visible with correct details.
- Specialty information is displayed accurately.
- No missing or incorrect data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-005: UPDATE - Edit Certification Specialty Details**
**Test ID**: TC-SPEC-CRUD-005  
**Priority**: High  
**Description**: Test editing an existing certification specialty entry's details.  
**Preconditions**: At least one certification specialty exists.  
**Test Steps**:
1. Click the "Edit" button next to the first specialty entry.
2. Modify the Certification Body field to "American Association of Critical-Care Nurses - Updated".
3. Modify the Certification Date field to "2024-06-15".
4. Click "Update Specialty" button.
**Expected Result**:
- Certification specialty updated successfully toast message displayed.
- Specialty entry details updated in the Certification Specialties section.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-006: UPDATE - Edit Specialty Name**
**Test ID**: TC-SPEC-CRUD-006  
**Priority**: Medium  
**Description**: Test editing a certification specialty's name.  
**Preconditions**: At least one certification specialty exists.  
**Test Steps**:
1. Click the "Edit" button next to the second specialty entry.
2. Modify the Specialty Name field to "Emergency Nursing - Updated".
3. Click "Update Specialty" button.
**Expected Result**:
- Certification specialty updated successfully toast message displayed.
- Specialty name updated in the Certification Specialties section.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-007: DELETE - Remove Certification Specialty**
**Test ID**: TC-SPEC-CRUD-007  
**Priority**: High  
**Description**: Test deleting an existing certification specialty entry.  
**Preconditions**: At least one certification specialty exists.  
**Test Steps**:
1. Click the "Delete" button next to the first specialty entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Certification specialty deleted successfully toast message displayed.
- Specialty entry removed from the Certification Specialties section.
- Total Certification Specialties count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SPEC-CRUD-008: DELETE - Remove Another Certification Specialty**
**Test ID**: TC-SPEC-CRUD-008  
**Priority**: Medium  
**Description**: Test deleting another certification specialty entry.  
**Preconditions**: At least one certification specialty exists.  
**Test Steps**:
1. Click the "Delete" button next to the second specialty entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Certification specialty deleted successfully toast message displayed.
- Specialty entry removed from the Certification Specialties section.
- Total Certification Specialties count decrements by 1.
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
- Certification specialty management provides complete functionality
- User experience remains smooth across all operations
- Data integrity is maintained throughout all operations

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All CRUD test cases execute successfully
- Certification specialty management works reliably
- Data persistence is maintained across operations
- User interface responds appropriately to all actions
- Screenshots captured for all test executions
- Comprehensive test reports generated

### **Test Data Requirements**
- Valid specialty names (Critical Care Nursing, Emergency Nursing, Oncology Nursing)
- Valid certification bodies (professional organizations)
- Valid certification dates (past dates)
- Test data for editing and updating operations

### **Expected Screenshots**
- Certification specialty creation forms
- Specialty listing with entries
- Specialty editing forms
- Specialty deletion confirmations
- Success/error toast messages
- Updated specialty listings
