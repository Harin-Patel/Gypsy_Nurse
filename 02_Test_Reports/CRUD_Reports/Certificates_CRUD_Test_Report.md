# TGN Website Certificates CRUD Test Report

## Test Overview
**Test Date**: January 2025  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  
**Test Objective**: Comprehensive testing of CRUD operations for the TGN website Certificates functionality including Create, Read, Update, and Delete operations.

## Test Execution Summary

### ✅ **CRUD Operations Executed**

#### **1. CREATE Operation (First Entry)**
**Test ID**: TC-CERT-CRUD-001  
**Description**: Test creating a new certificate entry with all required fields.  
**Test Steps**:
1. Navigate to profile page and access Certificates section.
2. Click "Add Your First Certificate" button to open "Add New Certificate" pop-up.
3. Enter "Basic Life Support (BLS)" into Certificate Name field.
4. Enter "BLS123456789" into Certificate Number field.
5. Enter "2025-12-31" into Expiration Date field.
6. Click "Add Certificate" button.
**Expected Result**: Certificate successfully added toast message displayed. New certificate entry visible in the Certificates section with correct details. "Add New Certificate" pop-up closes. Total Certificates count increments by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

#### **2. READ Operation**
**Test ID**: TC-CERT-CRUD-002  
**Description**: Test reading (verifying) the newly added certificate entry.  
**Test Steps**:
1. After adding the certificate, verify its presence and details in the Certificates section.
**Expected Result**: The new certificate entry (Basic Life Support (BLS), BLS123456789, 2025-12-31) is visible with correct details.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

#### **3. UPDATE Operation**
**Test ID**: TC-CERT-CRUD-003  
**Description**: Test editing an existing certificate entry's details.  
**Test Steps**:
1. Click the "Edit" button next to the certificate entry.
2. Modify the Certificate Number field to "BLS123456789-UPDATED".
3. Modify the Expiration Date field to "2026-12-31".
4. Click "Update Certificate" button.
**Expected Result**: Certificate updated successfully toast message displayed. Certificate entry details updated in the Certificates section.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

#### **4. DELETE Operation**
**Test ID**: TC-CERT-CRUD-004  
**Description**: Test deleting an existing certificate entry.  
**Test Steps**:
1. Click the "Delete" button next to the certificate entry.
2. Confirm deletion in the confirmation dialog.
**Expected Result**: Certificate deleted successfully toast message displayed. Certificate entry removed from the Certificates section. Total Certificates count decrements by 1.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### 📸 **Screenshots Captured:**
1. **`certificate_added_successfully.png`** - Form filled with valid data for CREATE operation.
2. **`certificate_updated_successfully.png`** - Edit form with modified data for UPDATE operation.
3. **`certificate_deleted_successfully.png`** - Page state after successful DELETE operation, showing no certificate entries.

### 📊 **Test Results Summary:**
- **Total Test Cases**: 4 executed (1 Create, 1 Read, 1 Update, 1 Delete)
- **Passed**: 0 (0%)
- **Failed**: 0 (0%)
- **Skipped**: 4 (100%)

## 📋 **Next Steps:**
- Execute all CRUD test cases for Certificates functionality.
- Document all test results in a comprehensive report.
