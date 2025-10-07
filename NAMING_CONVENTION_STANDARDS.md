# TGN MCP Testing Project - Naming Convention Standards

## 📋 **Standardized Naming Convention**

This document defines the standardized naming conventions for the TGN MCP Testing project to ensure consistency, clarity, and maintainability.

---

## 🎯 **General Principles**

### **1. File Naming Convention**
- **Format**: `ModuleName_TestType_TestCases.md` or `ModuleName_TestType_TestReport.md`
- **Case**: Pascal_Case for all file names
- **Separators**: Underscores (_) only
- **No spaces**: Use underscores instead of spaces
- **No special characters**: Avoid hyphens, dots, or other special characters

### **2. Directory Naming Convention**
- **Format**: `Number_CategoryName`
- **Case**: Pascal_Case
- **Separators**: Underscores (_) only
- **Numbering**: Use zero-padded numbers for ordering

### **3. Module Naming Convention**
- **Consistent Module Names**:
  - `Login_Logout` (not `Login`)
  - `Registration_Signup` (not `Registration`)
  - `Professional_Information` (not `Professional_Info`)
  - `Professional_Licenses`
  - `Professional_References`
  - `Work_History`
  - `Education_History`
  - `Certificates`
  - `Certification_Specialties`

---

## 📁 **Directory Structure Standards**

### **Test Cases Directory**
```
01_Test_Cases/
├── TGN_Test_Cases.md
├── Positive_Test_Cases/
│   ├── Login_Logout_Test_Cases.md
│   ├── Registration_Signup_Test_Cases.md
│   ├── Professional_Information_Test_Cases.md
│   ├── Professional_Licenses_Test_Cases.md
│   ├── Professional_References_Test_Cases.md
│   ├── Work_History_Test_Cases.md
│   ├── Education_History_Test_Cases.md
│   ├── Certificates_Test_Cases.md
│   ├── Certificates_CRUD_Test_Cases.md
│   ├── Certification_Specialties_Test_Cases.md
│   ├── Certification_Specialties_CRUD_Test_Cases.md
│   └── Education_History_CRUD_Test_Cases.md
└── Negative_Test_Cases/
    ├── Negative_Login_Logout_Test_Cases.md
    ├── Negative_Registration_Signup_Test_Cases.md
    ├── Negative_Professional_Information_Test_Cases.md
    ├── Negative_Professional_Licenses_Test_Cases.md
    ├── Negative_Professional_References_Test_Cases.md
    ├── Negative_Work_History_Test_Cases.md
    ├── Negative_Education_History_Test_Cases.md
    ├── Negative_Certificates_Test_Cases.md
    └── Negative_Certification_Specialties_Test_Cases.md
```

### **Test Reports Directory**
```
02_Test_Reports/
├── Positive_Reports/
│   ├── Login_Logout_Test_Report.md
│   ├── Registration_Signup_Test_Report.md
│   ├── Professional_Information_Test_Report.md
│   ├── Professional_Licenses_Test_Report.md
│   ├── Professional_References_Test_Report.md
│   ├── Work_History_Test_Report.md
│   ├── Education_History_Test_Report.md
│   ├── Certificates_Test_Report.md
│   └── Certification_Specialties_Test_Report.md
├── Negative_Reports/
│   ├── Negative_Login_Logout_Test_Report.md
│   ├── Negative_Registration_Signup_Test_Report.md
│   ├── Negative_Professional_Information_Test_Report.md
│   ├── Negative_Professional_Licenses_Test_Report.md
│   ├── Negative_Professional_References_Test_Report.md
│   ├── Negative_Work_History_Test_Report.md
│   ├── Negative_Education_History_Test_Report.md
│   ├── Negative_Certificates_Test_Report.md
│   └── Negative_Certification_Specialties_Test_Report.md
├── CRUD_Reports/
│   ├── Professional_Licenses_CRUD_Test_Report.md
│   ├── Professional_References_CRUD_Test_Report.md
│   ├── Work_History_CRUD_Test_Report.md
│   ├── Certificates_CRUD_Test_Report.md
│   ├── Certification_Specialties_CRUD_Test_Report.md
│   └── Education_History_CRUD_Test_Report.md
└── Functionality_Reports/
    ├── Login_Logout_Functionality_Test_Report.md
    └── Registration_Signup_Functionality_Test_Report.md
```

---

## 🏷️ **File Naming Standards**

### **Test Case Files**
- **Format**: `ModuleName_Test_Cases.md`
- **Examples**:
  - `Login_Logout_Test_Cases.md`
  - `Professional_Information_Test_Cases.md`
  - `Certificates_CRUD_Test_Cases.md`

### **Test Report Files**
- **Format**: `ModuleName_Test_Report.md` or `ModuleName_Type_Test_Report.md`
- **Examples**:
  - `Login_Logout_Test_Report.md`
  - `Professional_Information_Test_Report.md`
  - `Certificates_CRUD_Test_Report.md`

### **Negative Test Files**
- **Format**: `Negative_ModuleName_Test_Cases.md`
- **Examples**:
  - `Negative_Login_Logout_Test_Cases.md`
  - `Negative_Professional_Information_Test_Cases.md`

### **CRUD Test Files**
- **Format**: `ModuleName_CRUD_Test_Cases.md`
- **Examples**:
  - `Certificates_CRUD_Test_Cases.md`
  - `Education_History_CRUD_Test_Cases.md`

---

## 📝 **Content Standards**

### **Test Case Headers**
- **Title Format**: `TGN Website [ModuleName] Test Cases`
- **Test Suite**: `[ModuleName] Functionality`
- **Test ID Format**: `TC-MODULE-TYPE-###`

### **Test Report Headers**
- **Title Format**: `TGN Website [ModuleName] Test Report`
- **Test Overview**: Consistent structure across all reports

### **Test ID Standards**
- **Login/Logout**: `TC-LOGIN-POS-###`, `TC-LOGIN-NEG-###`
- **Registration**: `TC-REG-POS-###`, `TC-REG-NEG-###`
- **Professional Information**: `TC-PROF-POS-###`, `TC-PROF-NEG-###`
- **Professional Licenses**: `TC-LIC-POS-###`, `TC-LIC-NEG-###`
- **Professional References**: `TC-REF-POS-###`, `TC-REF-NEG-###`
- **Work History**: `TC-WORK-POS-###`, `TC-WORK-NEG-###`
- **Education History**: `TC-EDU-POS-###`, `TC-EDU-NEG-###`
- **Certificates**: `TC-CERT-POS-###`, `TC-CERT-NEG-###`
- **Certification Specialties**: `TC-SPEC-POS-###`, `TC-SPEC-NEG-###`

---

## 🔄 **Implementation Plan**

### **Phase 1: File Renaming**
1. Rename all files to follow standardized naming convention
2. Update all internal references and links
3. Update INDEX.md with new file names

### **Phase 2: Content Standardization**
1. Standardize all test case headers
2. Standardize all test report headers
3. Standardize all test ID formats

### **Phase 3: Documentation Updates**
1. Update PROJECT_STRUCTURE.md
2. Update INDEX.md
3. Update all cross-references

---

## ✅ **Benefits of Standardized Naming**

1. **Consistency**: All files follow the same naming pattern
2. **Clarity**: Easy to identify file purpose and content
3. **Maintainability**: Easy to locate and update files
4. **Scalability**: Easy to add new files following the same pattern
5. **Professional**: Consistent with industry standards

---

## 📋 **Checklist for Implementation**

- [ ] Rename all test case files
- [ ] Rename all test report files
- [ ] Update all internal links
- [ ] Standardize all headers
- [ ] Standardize all test IDs
- [ ] Update documentation
- [ ] Verify all references work
- [ ] Test all links in INDEX.md
