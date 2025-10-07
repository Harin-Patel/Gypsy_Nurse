# TGN MCP Testing - Develop Branch Workflow

## Overview
This project now uses the **develop branch** as the default branch for all new changes and feature development. This follows the Git Flow branching strategy for better code management and collaboration.

## Branch Structure

### 🌿 **Main Branches**
- **`main`**: Production-ready code, stable releases
- **`develop`**: Integration branch for new features and changes

### 🔄 **Workflow**
1. **All new changes** → `develop` branch
2. **Feature development** → `develop` branch  
3. **Bug fixes** → `develop` branch
4. **Test case updates** → `develop` branch
5. **Documentation updates** → `develop` branch

## 🚀 **Quick Commands**

### **Check Current Branch**
```bash
git branch --show-current
```

### **Switch to Develop Branch**
```bash
git checkout develop
```

### **Push Changes to Develop**
```bash
# Method 1: Direct push
git push origin develop

# Method 2: Using the script
./push_to_develop.sh
```

### **Create and Switch to New Feature Branch**
```bash
git checkout -b feature/new-feature-name
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature-name
```

## 📋 **Standard Workflow**

### **1. Making Changes**
```bash
# Ensure you're on develop branch
git checkout develop

# Pull latest changes
git pull origin develop

# Make your changes
# ... edit files ...

# Stage changes
git add .

# Commit changes
git commit -m "Descriptive commit message"

# Push to develop
git push origin develop
```

### **2. Using the Push Script**
```bash
# Make your changes
# ... edit files ...

# Stage and commit
git add .
git commit -m "Your commit message"

# Use the push script
./push_to_develop.sh
```

## 🔄 **Branch Management**

### **Syncing with Main Branch**
When ready to merge changes to main:
```bash
# Switch to main
git checkout main

# Pull latest main
git pull origin main

# Merge develop into main
git merge develop

# Push to main
git push origin main
```

### **Creating Pull Requests**
1. Go to GitHub repository
2. Create pull request from `develop` to `main`
3. Review changes
4. Merge when ready

## 📁 **Current Repository Status**

- **Default Branch**: `develop`
- **Current Branch**: `develop`
- **Remote Tracking**: `origin/develop`
- **Push Script**: `./push_to_develop.sh`

## 🎯 **Benefits of Develop Branch Workflow**

### ✅ **Advantages**
1. **Stable Main Branch**: Main branch remains stable for production
2. **Feature Integration**: All features integrated in develop before main
3. **Collaboration**: Multiple developers can work on develop branch
4. **Testing**: Test changes in develop before merging to main
5. **Rollback**: Easy to rollback changes if needed

### 🔧 **Best Practices**
1. **Always work on develop branch** for new changes
2. **Pull latest changes** before starting work
3. **Commit frequently** with descriptive messages
4. **Test thoroughly** before merging to main
5. **Use feature branches** for large features

## 🚨 **Important Notes**

### **⚠️ Before Making Changes**
```bash
# Always check current branch
git branch --show-current

# If not on develop, switch
git checkout develop

# Pull latest changes
git pull origin develop
```

### **📝 Commit Message Format**
```bash
# Good commit messages
git commit -m "Add professional information edit test cases"
git commit -m "Update test execution guide with new features"
git commit -m "Fix validation issues in form fields"

# Avoid vague messages
git commit -m "Update"
git commit -m "Fix"
git commit -m "Changes"
```

## 🔗 **GitHub Repository**

- **Repository**: https://github.com/Harin-Patel/Gypsy_Nurse
- **Develop Branch**: https://github.com/Harin-Patel/Gypsy_Nurse/tree/develop
- **Main Branch**: https://github.com/Harin-Patel/Gypsy_Nurse/tree/main

## 📞 **Support**

If you encounter any issues with the develop branch workflow:

1. **Check current branch**: `git branch --show-current`
2. **Switch to develop**: `git checkout develop`
3. **Pull latest changes**: `git pull origin develop`
4. **Check status**: `git status`
5. **Use push script**: `./push_to_develop.sh`

---

*Develop branch workflow established for TGN MCP Testing project on January 2025*
