# TGN MCP Testing Project Structure

## 📁 Project Organization

This project has been restructured into a well-organized, categorized structure for better maintainability and navigation.

### 🗂️ Directory Structure

```
TGN_MCP_TC/
├── 01_Test_Cases/                    # All test case documentation
│   ├── TGN_Test_Cases.md            # Main comprehensive test cases
│   ├── Positive_Test_Cases/         # Positive test scenarios
│   │   ├── Login_Logout_Test_Cases.md
│   │   ├── Registration_Signup_Test_Cases.md
│   │   ├── Professional_Information_Test_Cases.md
│   │   ├── Professional_Licenses_Test_Cases.md
│   │   ├── Professional_References_Test_Cases.md
│   │   ├── Work_History_Test_Cases.md
│   │   ├── Education_History_Test_Cases.md
│   │   ├── Education_History_CRUD_Test_Cases.md
│   │   ├── Certificates_Test_Cases.md
│   │   ├── Certificates_CRUD_Test_Cases.md
│   │   ├── Certification_Specialties_Test_Cases.md
│   │   └── Certification_Specialties_CRUD_Test_Cases.md
│   └── Negative_Test_Cases/         # Negative test scenarios
│       ├── Negative_Login_Logout_Test_Cases.md
│       ├── Negative_Registration_Signup_Test_Cases.md
│       ├── Negative_Professional_Information_Test_Cases.md
│       ├── Negative_Professional_Licenses_Test_Cases.md
│       ├── Negative_Professional_References_Test_Cases.md
│       ├── Negative_Work_History_Test_Cases.md
│       ├── Negative_Education_History_Test_Cases.md
│       ├── Negative_Certificates_Test_Cases.md
│       └── Negative_Certification_Specialties_Test_Cases.md
│
├── 02_Test_Reports/                  # All test execution reports
│   ├── Positive_Reports/            # Positive test results
│   │   ├── Login_Test_Report.md
│   │   ├── Registration_Test_Report.md
│   │   ├── Professional_Information_Test_Report.md
│   │   ├── Professional_Licenses_Test_Report.md
│   │   ├── Professional_References_Test_Report.md
│   │   ├── Work_History_Test_Report.md
│   │   ├── Education_History_Test_Report.md
│   │   ├── Certificates_Test_Report.md
│   │   └── Certification_Specialties_Test_Report.md
│   ├── Negative_Reports/             # Negative test results
│   │   ├── Negative_Login_Logout_Test_Report.md
│   │   ├── Negative_Registration_Signup_Test_Report.md
│   │   ├── Negative_Professional_Information_Test_Report.md
│   │   ├── Negative_Professional_Licenses_Test_Report.md
│   │   ├── Negative_Professional_References_Test_Report.md
│   │   ├── Negative_Work_History_Test_Report.md
│   │   ├── Negative_Education_History_Test_Report.md
│   │   ├── Negative_Certificates_Test_Report.md
│   │   └── Negative_Certification_Specialties_Test_Report.md
│   ├── CRUD_Reports/                 # CRUD operation test results
│   │   ├── Professional_Licenses_CRUD_Test_Report.md
│   │   ├── Professional_References_CRUD_Test_Report.md
│   │   ├── Work_History_CRUD_Test_Report.md
│   │   ├── Certificates_CRUD_Test_Report.md
│   │   ├── Certification_Specialties_CRUD_Test_Report.md
│   │   └── Education_History_CRUD_Test_Report.md
│   └── Functionality_Reports/        # Comprehensive functionality reports
│       ├── Login_Logout_Functionality_Test_Report.md
│       └── Registration_Signup_Functionality_Test_Report.md
│
├── 03_Test_Scripts/                  # Automation scripts
│   └── automated_test_scripts.js    # Main automation script
│
├── 04_Documentation/                 # Project documentation
│   ├── README.md                    # Project overview
│   ├── Test_Execution_Guide.md     # How to run tests
│   └── GitHub_Integration_Guide.md  # GitHub setup guide
│
├── 05_Project_Setup/                # Project configuration
│   └── package.json                 # Node.js project configuration
│
└── PROJECT_STRUCTURE.md             # This file
```

## 📋 File Categories

### 🧪 Test Cases (01_Test_Cases/)
- **Main Test Cases**: Comprehensive test scenarios for all TGN website functionalities
- **Positive Test Cases**: Valid input scenarios and expected successful outcomes
- **Negative Test Cases**: Invalid input scenarios and error handling validation

### 📊 Test Reports (02_Test_Reports/)
- **Positive Reports**: Results of successful test executions
- **Negative Reports**: Results of error handling and validation tests
- **CRUD Reports**: Create, Read, Update, Delete operation test results
- **Functionality Reports**: Comprehensive functionality testing results

### 🤖 Test Scripts (03_Test_Scripts/)
- **Automation Scripts**: JavaScript automation code for executing tests

### 📚 Documentation (04_Documentation/)
- **Project Overview**: README with project description and setup
- **Execution Guide**: Step-by-step instructions for running tests
- **Integration Guide**: GitHub setup and version control instructions

### ⚙️ Project Setup (05_Project_Setup/)
- **Configuration Files**: Node.js package configuration and dependencies

## 🎯 Benefits of This Structure

1. **Clear Organization**: Files are logically grouped by purpose and type
2. **Easy Navigation**: Developers can quickly find relevant files
3. **Scalability**: Easy to add new test cases and reports
4. **Maintainability**: Clear separation of concerns
5. **Professional Appearance**: Clean, organized project structure

## 🚀 Usage

- **Test Cases**: Refer to `01_Test_Cases/` for all test scenarios
- **Test Results**: Check `02_Test_Reports/` for execution results
- **Running Tests**: Use scripts in `03_Test_Scripts/`
- **Documentation**: Read files in `04_Documentation/` for setup and usage
- **Configuration**: Modify files in `05_Project_Setup/` as needed

## 📝 Notes

- All files maintain their original content and functionality
- File paths in documentation may need updating if referenced elsewhere
- Screenshots and other assets remain in their original locations
- This structure follows industry best practices for test automation projects
