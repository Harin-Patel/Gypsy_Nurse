# TGN Website Registration/Sign Up Test Cases

## Test Suite Overview
**Test Suite**: Registration/Sign Up Functionality  
**Total Test Cases**: 15 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **User Registration** (8 test cases)
2. **Email Verification** (3 test cases)
3. **Account Setup** (4 test cases)

---

## ✅ **POSITIVE TEST CASES**

### **TC-REG-POS-001: Valid User Registration (Nurse)**
**Test ID**: TC-REG-POS-001  
**Priority**: High  
**Description**: Test successful registration with valid nurse credentials.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Select "Nurse" as user type.
3. Enter valid first name (e.g., "John").
4. Enter valid last name (e.g., "Doe").
5. Enter valid email address (e.g., "john.doe@example.com").
6. Enter valid password (e.g., "SecurePass123!").
7. Confirm password (e.g., "SecurePass123!").
8. Accept terms and conditions.
9. Click "Create Account" button.
**Expected Result**:
- Account created successfully.
- Email verification sent.
- Redirected to email verification page.
- Success toast message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-002: Valid User Registration (Employer)**
**Test ID**: TC-REG-POS-002  
**Priority**: High  
**Description**: Test successful registration with valid employer credentials.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Select "Employer" as user type.
3. Enter valid company name (e.g., "Healthcare Solutions Inc").
4. Enter valid first name (e.g., "Jane").
5. Enter valid last name (e.g., "Smith").
6. Enter valid email address (e.g., "jane.smith@healthcare.com").
7. Enter valid password (e.g., "EmployerPass123!").
8. Confirm password (e.g., "EmployerPass123!").
9. Accept terms and conditions.
10. Click "Create Account" button.
**Expected Result**:
- Employer account created successfully.
- Email verification sent.
- Redirected to email verification page.
- Success toast message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-003: Registration with Social Media (Google)**
**Test ID**: TC-REG-POS-003  
**Priority**: Medium  
**Description**: Test registration using Google OAuth.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Click "Sign up with Google" button.
3. Complete Google OAuth flow.
4. Select user type (Nurse or Employer).
5. Complete additional required fields.
6. Accept terms and conditions.
7. Click "Complete Registration" button.
**Expected Result**:
- Account created using Google credentials.
- User profile populated with Google data.
- Registration completed successfully.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-004: Registration with Social Media (LinkedIn)**
**Test ID**: TC-REG-POS-004  
**Priority**: Medium  
**Description**: Test registration using LinkedIn OAuth.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Click "Sign up with LinkedIn" button.
3. Complete LinkedIn OAuth flow.
4. Select user type (Nurse or Employer).
5. Complete additional required fields.
6. Accept terms and conditions.
7. Click "Complete Registration" button.
**Expected Result**:
- Account created using LinkedIn credentials.
- Professional profile populated with LinkedIn data.
- Registration completed successfully.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-005: Registration with Strong Password**
**Test ID**: TC-REG-POS-005  
**Priority**: High  
**Description**: Test registration with strong password requirements.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Enter valid user information.
3. Enter strong password with:
   - At least 8 characters
   - Uppercase letter
   - Lowercase letter
   - Number
   - Special character
4. Confirm password.
5. Complete registration.
**Expected Result**:
- Password strength indicator shows "Strong".
- Registration completed successfully.
- Account created with secure password.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-006: Registration with Professional Information**
**Test ID**: TC-REG-POS-006  
**Priority**: Medium  
**Description**: Test registration with additional professional information.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Select "Nurse" as user type.
3. Enter basic information.
4. Fill in professional information:
   - License number
   - Years of experience
   - Specialization
   - Location preferences
5. Complete registration.
**Expected Result**:
- Professional information saved.
- Registration completed successfully.
- Profile pre-populated with professional data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-007: Registration with Company Information (Employer)**
**Test ID**: TC-REG-POS-007  
**Priority**: Medium  
**Description**: Test employer registration with company information.  
**Preconditions**: User is on the registration page.  
**Test Steps**:
1. Navigate to the registration page.
2. Select "Employer" as user type.
3. Enter company information:
   - Company name
   - Industry
   - Company size
   - Location
4. Enter contact information.
5. Complete registration.
**Expected Result**:
- Company information saved.
- Employer account created successfully.
- Company profile pre-populated.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-REG-POS-008: Registration with Referral Code**
**Test ID**: TC-REG-POS-008  
**Priority**: Low  
**Description**: Test registration with referral code.  
**Preconditions**: User is on the registration page with referral code.  
**Test Steps**:
1. Navigate to the registration page with referral link.
2. Verify referral code is pre-filled.
3. Complete registration process.
4. Verify referral benefits applied.
**Expected Result**:
- Referral code applied successfully.
- Referral benefits activated.
- Registration completed with referral credit.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📧 **EMAIL VERIFICATION**

### **TC-EMAIL-POS-001: Email Verification Process**
**Test ID**: TC-EMAIL-POS-001  
**Priority**: High  
**Description**: Test email verification after registration.  
**Preconditions**: User has registered and received verification email.  
**Test Steps**:
1. Check email inbox for verification email.
2. Click verification link in email.
3. Verify account is activated.
4. Login with verified account.
**Expected Result**:
- Email verification link works.
- Account is activated successfully.
- User can login with verified account.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EMAIL-POS-002: Resend Verification Email**
**Test ID**: TC-EMAIL-POS-002  
**Priority**: Medium  
**Description**: Test resending verification email.  
**Preconditions**: User has registered but not verified email.  
**Test Steps**:
1. Login with unverified account.
2. Click "Resend verification email" link.
3. Check email for new verification link.
4. Click new verification link.
**Expected Result**:
- New verification email sent.
- New verification link works.
- Account is activated successfully.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-EMAIL-POS-003: Email Verification Expiry**
**Test ID**: TC-EMAIL-POS-003  
**Priority**: Medium  
**Description**: Test email verification link expiry.  
**Preconditions**: User has old verification email.  
**Test Steps**:
1. Use old verification link (after expiry time).
2. Verify appropriate error message.
3. Request new verification email.
4. Use new verification link.
**Expected Result**:
- Old link shows expiry message.
- New verification email sent.
- New link works correctly.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🏗️ **ACCOUNT SETUP**

### **TC-SETUP-POS-001: Profile Completion Wizard**
**Test ID**: TC-SETUP-POS-001  
**Priority**: High  
**Description**: Test profile completion wizard after registration.  
**Preconditions**: User has verified email and logged in.  
**Test Steps**:
1. Login with verified account.
2. Complete profile setup wizard:
   - Personal information
   - Professional information
   - Preferences
   - Notifications
3. Save profile information.
**Expected Result**:
- Profile wizard guides user through setup.
- All information saved correctly.
- Profile completion percentage updated.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SETUP-POS-002: Resume Upload During Setup**
**Test ID**: TC-SETUP-POS-002  
**Priority**: Medium  
**Description**: Test resume upload during account setup.  
**Preconditions**: User is in profile setup wizard.  
**Test Steps**:
1. Navigate to resume upload section.
2. Upload valid resume file (PDF/DOC).
3. Verify resume parsing and data extraction.
4. Review extracted information.
5. Save profile with resume data.
**Expected Result**:
- Resume uploaded successfully.
- Information extracted from resume.
- Profile populated with resume data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SETUP-POS-003: Notification Preferences Setup**
**Test ID**: TC-SETUP-POS-003  
**Priority**: Medium  
**Description**: Test notification preferences during setup.  
**Preconditions**: User is in profile setup wizard.  
**Test Steps**:
1. Navigate to notification preferences.
2. Configure email notifications:
   - Job alerts
   - Event notifications
   - Newsletter subscription
3. Configure SMS notifications.
4. Save notification preferences.
**Expected Result**:
- Notification preferences saved.
- User receives configured notifications.
- Preferences can be modified later.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SETUP-POS-004: Account Verification Documents**
**Test ID**: TC-SETUP-POS-004  
**Priority**: Medium  
**Description**: Test document upload for account verification.  
**Preconditions**: User is in profile setup wizard.  
**Test Steps**:
1. Navigate to document verification section.
2. Upload required documents:
   - License verification
   - Identity verification
   - Professional certificates
3. Submit documents for verification.
4. Check verification status.
**Expected Result**:
- Documents uploaded successfully.
- Verification process initiated.
- Status updated appropriately.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 15
- **User Registration**: 8 test cases
- **Email Verification**: 3 test cases
- **Account Setup**: 4 test cases

### **Expected Outcomes**
- All registration scenarios work correctly with proper validation
- Email verification process is secure and user-friendly
- Account setup wizard guides users through complete profile creation
- User experience remains smooth across all registration flows

### **Test Environment Requirements**
- Valid email addresses for testing
- Social media accounts for OAuth testing
- Document files for upload testing
- Stable internet connection
- Chrome browser with DevTools MCP enabled

### **Success Criteria**
- All positive test cases execute successfully
- Registration process works reliably for all user types
- Email verification is secure and functional
- Account setup provides comprehensive profile creation
- Screenshots captured for all test executions
- Comprehensive test reports generated
