# TGN Website Login/Logout Test Cases

## Test Suite Overview
**Test Suite**: Login/Logout Functionality  
**Total Test Cases**: 12 comprehensive test cases  
**Test Environment**: Staging  
**Test Tool**: Chrome DevTools MCP with Playwright  
**Website URL**: http://tgn-frontend-staging-375478166582-us-east-1.s3-website-us-east-1.amazonaws.com/  

## Test Case Categories
1. **Login Functionality** (6 test cases)
2. **Logout Functionality** (3 test cases)
3. **Session Management** (3 test cases)

---

## ✅ **POSITIVE TEST CASES**

### **TC-LOGIN-POS-001: Valid User Login**
**Test ID**: TC-LOGIN-POS-001  
**Priority**: High  
**Description**: Test successful login with valid credentials.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address (e.g., "julie@yopmail.com").
3. Enter valid password (e.g., "Harin123").
4. Click "Login" button.
**Expected Result**:
- User successfully logged in.
- Redirected to dashboard/profile page.
- User menu shows logged-in state.
- Success toast message displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-POS-002: Remember Me Functionality**
**Test ID**: TC-LOGIN-POS-002  
**Priority**: Medium  
**Description**: Test login with "Remember Me" checkbox checked.  
**Preconditions**: User is on the login page.  
**Test Steps**:
1. Navigate to the login page.
2. Enter valid email address.
3. Enter valid password.
4. Check "Remember Me" checkbox.
5. Click "Login" button.
6. Close browser and reopen.
7. Navigate to the website.
**Expected Result**:
- User remains logged in after browser restart.
- Session persists across browser sessions.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-POS-003: Login with Different User Roles**
**Test ID**: TC-LOGIN-POS-003  
**Priority**: High  
**Description**: Test login with different user roles (Nurse, Employer, Admin).  
**Preconditions**: Multiple user accounts with different roles exist.  
**Test Steps**:
1. Login as Nurse user.
2. Verify nurse-specific dashboard and features.
3. Logout and login as Employer user.
4. Verify employer-specific dashboard and features.
5. Logout and login as Admin user.
6. Verify admin-specific dashboard and features.
**Expected Result**:
- Each role sees appropriate dashboard and features.
- Role-based access control works correctly.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-POS-004: Login from Different Pages**
**Test ID**: TC-LOGIN-POS-004  
**Priority**: Medium  
**Description**: Test login functionality from different pages (Homepage, Jobs, Events).  
**Preconditions**: User is not logged in.  
**Test Steps**:
1. Navigate to homepage and click login.
2. Complete login process.
3. Navigate to jobs page and click login.
4. Complete login process.
5. Navigate to events page and click login.
6. Complete login process.
**Expected Result**:
- Login works from all pages.
- User is redirected appropriately after login.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-POS-005: Login with Social Media Accounts**
**Test ID**: TC-LOGIN-POS-005  
**Priority**: Medium  
**Description**: Test login using social media accounts (Google, Facebook, LinkedIn).  
**Preconditions**: Social media login options are available.  
**Test Steps**:
1. Click "Login with Google" button.
2. Complete Google OAuth flow.
3. Verify successful login.
4. Logout and try Facebook login.
5. Complete Facebook OAuth flow.
6. Verify successful login.
**Expected Result**:
- Social media login works correctly.
- User profile is created/updated with social media data.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGIN-POS-006: Login with Mobile Device**
**Test ID**: TC-LOGIN-POS-006  
**Priority**: Low  
**Description**: Test login functionality on mobile devices.  
**Preconditions**: Mobile device or mobile view enabled.  
**Test Steps**:
1. Open website on mobile device.
2. Navigate to login page.
3. Enter valid credentials.
4. Click login button.
5. Verify mobile-optimized dashboard loads.
**Expected Result**:
- Login works on mobile devices.
- Mobile-optimized interface is displayed.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🚪 **LOGOUT FUNCTIONALITY**

### **TC-LOGOUT-POS-001: Standard Logout**
**Test ID**: TC-LOGOUT-POS-001  
**Priority**: High  
**Description**: Test standard logout functionality.  
**Preconditions**: User is logged in.  
**Test Steps**:
1. Click on user menu/profile icon.
2. Click "Logout" option.
3. Confirm logout if prompted.
**Expected Result**:
- User is logged out successfully.
- Redirected to homepage or login page.
- User menu shows login option.
- Session is cleared.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGOUT-POS-002: Logout from Different Pages**
**Test ID**: TC-LOGOUT-POS-002  
**Priority**: Medium  
**Description**: Test logout functionality from different pages.  
**Preconditions**: User is logged in.  
**Test Steps**:
1. Navigate to profile page and logout.
2. Login again and navigate to jobs page.
3. Logout from jobs page.
4. Login again and navigate to events page.
5. Logout from events page.
**Expected Result**:
- Logout works from all pages.
- User is redirected appropriately after logout.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-LOGOUT-POS-003: Automatic Logout on Inactivity**
**Test ID**: TC-LOGOUT-POS-003  
**Priority**: Medium  
**Description**: Test automatic logout after period of inactivity.  
**Preconditions**: User is logged in with session timeout configured.  
**Test Steps**:
1. Login to the system.
2. Leave the browser idle for the configured timeout period.
3. Try to perform an action.
**Expected Result**:
- User is automatically logged out.
- Redirected to login page with timeout message.
- Session is cleared.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 🔐 **SESSION MANAGEMENT**

### **TC-SESSION-POS-001: Session Persistence**
**Test ID**: TC-SESSION-POS-001  
**Priority**: High  
**Description**: Test session persistence across page navigation.  
**Preconditions**: User is logged in.  
**Test Steps**:
1. Login to the system.
2. Navigate between different pages (Home, Jobs, Events, Profile).
3. Verify user remains logged in.
4. Refresh the page.
5. Verify user remains logged in.
**Expected Result**:
- Session persists across page navigation.
- User remains logged in after page refresh.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SESSION-POS-002: Multiple Tab Session Management**
**Test ID**: TC-SESSION-POS-002  
**Priority**: Medium  
**Description**: Test session management across multiple browser tabs.  
**Preconditions**: User is logged in.  
**Test Steps**:
1. Login in one tab.
2. Open new tab and navigate to the website.
3. Verify user is logged in in the new tab.
4. Logout from one tab.
5. Check other tabs.
**Expected Result**:
- Session is shared across tabs.
- Logout from one tab affects all tabs.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

### **TC-SESSION-POS-003: Session Security**
**Test ID**: TC-SESSION-POS-003  
**Priority**: High  
**Description**: Test session security and token management.  
**Preconditions**: User is logged in.  
**Test Steps**:
1. Login to the system.
2. Check browser developer tools for session tokens.
3. Verify tokens are secure (HttpOnly, Secure flags).
4. Test token expiration handling.
**Expected Result**:
- Session tokens are properly secured.
- Tokens have appropriate security flags.
- Token expiration is handled gracefully.
**Actual Result**: NOT EXECUTED  
**Screenshot**: N/A

---

## 📊 **Test Execution Summary**

### **Test Results Overview**
- **Total Test Cases**: 12
- **Login Functionality**: 6 test cases
- **Logout Functionality**: 3 test cases
- **Session Management**: 3 test cases

### **Expected Outcomes**
- All login scenarios work correctly with proper validation
- Logout functionality works from all pages and contexts
- Session management provides security and user experience
- User experience remains smooth across all scenarios

### **Test Environment Requirements**
- Valid user accounts with different roles
- Stable internet connection
- Chrome browser with DevTools MCP enabled
- Playwright automation framework

### **Success Criteria**
- All positive test cases execute successfully
- Login/logout functionality works reliably
- Session management provides appropriate security
- User experience is smooth and intuitive
- Screenshots captured for all test executions
- Comprehensive test reports generated
