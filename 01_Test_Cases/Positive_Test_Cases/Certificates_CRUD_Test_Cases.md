# TGN Website Certificates CRUD Test Cases

## Test Suite Overview
**Test Suite**: Certificates Management - CRUD Operations  
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

### **TC-CERT-CRUD-001: CREATE - Add First Certificate**
**Test ID**: TC-CERT-CRUD-001  
**Priority**: High  
**Description**: Test creating a new certificate entry with all required fields.  
**Preconditions**: User is logged in and on the profile page.  
**Test Steps**:
1. Navigate to profile page and access Certificates section.
2. Click "Add Your First Certificate" button to open "Add New Certificate" pop-up.
3. Enter "Basic Life Support (BLS)" into Certificate Name field.
4. Enter "BLS123456789" into Certificate Number field.
5. Enter "2025-12-31" into Expiration Date field.
6. Click "Add Certificate" button.
**Expected Result**:
- Certificate successfully added toast message displayed.
- New certificate entry visible in the Certificates section with correct details.
- "Add New Certificate" pop-up closes.
- Total Certificates count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-002: CREATE - Add Second Certificate**
**Test ID**: TC-CERT-CRUD-002  
**Priority**: High  
**Description**: Test creating a second certificate entry.  
**Preconditions**: At least one certificate already exists.  
**Test Steps**:
1. Click "Add Certificate" button to open "Add New Certificate" pop-up.
2. Enter "Advanced Cardiac Life Support (ACLS)" into Certificate Name field.
3. Enter "ACLS987654321" into Certificate Number field.
4. Enter "2025-11-30" into Expiration Date field.
5. Click "Add Certificate" button.
**Expected Result**:
- Certificate successfully added toast message displayed.
- New certificate entry visible in the Certificates section.
- Total Certificates count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-003: CREATE - Add Third Certificate**
**Test ID**: TC-CERT-CRUD-003  
**Priority**: Medium  
**Description**: Test creating a third certificate entry.  
**Preconditions**: At least two certificates already exist.  
**Test Steps**:
1. Click "Add Certificate" button to open "Add New Certificate" pop-up.
2. Enter "Pediatric Advanced Life Support (PALS)" into Certificate Name field.
3. Enter "PALS456789123" into Certificate Number field.
4. Enter "2025-10-15" into Expiration Date field.
5. Click "Add Certificate" button.
**Expected Result**:
- Certificate successfully added toast message displayed.
- New certificate entry visible in the Certificates section.
- Total Certificates count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-004: READ - View Certificate Details**
**Test ID**: TC-CERT-CRUD-004  
**Priority**: High  
**Description**: Test reading (verifying) certificate entries and their details.  
**Preconditions**: At least one certificate exists.  
**Test Steps**:
1. Navigate to Certificates section.
2. Verify all certificate entries are displayed with correct information.
3. Check that certificate details are accurate and complete.
**Expected Result**:
- All certificate entries are visible with correct details.
- Certificate information is displayed accurately.
- No missing or incorrect data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-005: UPDATE - Edit Certificate Details**
**Test ID**: TC-CERT-CRUD-005  
**Priority**: High  
**Description**: Test editing an existing certificate entry's details.  
**Preconditions**: At least one certificate exists.  
**Test Steps**:
1. Click the "Edit" button next to the first certificate entry.
2. Modify the Certificate Number field to "BLS123456789-UPDATED".
3. Modify the Expiration Date field to "2026-12-31".
4. Click "Update Certificate" button.
**Expected Result**:
- Certificate updated successfully toast message displayed.
- Certificate entry details updated in the Certificates section.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-006: UPDATE - Edit Certificate Name**
**Test ID**: TC-CERT-CRUD-006  
**Priority**: Medium  
**Description**: Test editing a certificate's name.  
**Preconditions**: At least one certificate exists.  
**Test Steps**:
1. Click the "Edit" button next to the second certificate entry.
2. Modify the Certificate Name field to "Advanced Cardiac Life Support (ACLS) - Updated".
3. Click "Update Certificate" button.
**Expected Result**:
- Certificate updated successfully toast message displayed.
- Certificate name updated in the Certificates section.
- Changes are reflected immediately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-007: DELETE - Remove Certificate**
**Test ID**: TC-CERT-CRUD-007  
**Priority**: High  
**Description**: Test deleting an existing certificate entry.  
**Preconditions**: At least one certificate exists.  
**Test Steps**:
1. Click the "Delete" button next to the first certificate entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Certificate deleted successfully toast message displayed.
- Certificate entry removed from the Certificates section.
- Total Certificates count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-CERT-CRUD-008: DELETE - Remove Another Certificate**
**Test ID**: TC-CERT-CRUD-008  
**Priority**: Medium  
**Description**: Test deleting another certificate entry.  
**Preconditions**: At least one certificate exists.  
**Test Steps**:
1. Click the "Delete" button next to the second certificate entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**:
- Certificate deleted successfully toast message displayed.
- Certificate entry removed from the Certificates section.
- Total Certificates count decrements by 1.
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
- Certificate management provides complete functionality
- User experience remains smooth across all operations
- Data integrity is maintained throughout all operations

### **Test Environment Requirements**
- Valid user account with profile access
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All CRUD test cases execute successfully
- Certificate management works reliably
- Data persistence is maintained across operations
- User interface responds appropriately to all actions
- Screenshots captured for all test executions
- Comprehensive test reports generated

### **Test Data Requirements**
- Valid certificate names (BLS, ACLS, PALS)
- Valid certificate numbers (unique identifiers)
- Valid expiration dates (future dates)
- Test data for editing and updating operations

### **Expected Screenshots**
- Certificate creation forms
- Certificate listing with entries
- Certificate editing forms
- Certificate deletion confirmations
- Success/error toast messages
- Updated certificate listings
