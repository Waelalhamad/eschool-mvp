# 🔧 NPM Installation Fix Guide

## 🚨 Issues Identified

1. **Backend**: `tsconfig-paths@^4.2.1` version not found
2. **Mobile**: 11 vulnerabilities (2 low, 9 high)
3. **Version conflicts** in dependencies

## ✅ Solutions Applied

### 1. **Backend Package.json Updates**
- Updated `tsconfig-paths` from `^4.2.1` to `^4.2.0` (stable version)
- Updated all NestJS packages to latest stable versions
- Updated TypeScript and related packages
- Fixed security vulnerabilities

### 2. **Mobile Package.json Updates**
- Updated Expo SDK to version 50 (latest stable)
- Updated React Navigation to latest versions
- Updated Redux Toolkit to version 2.x
- Updated all dependencies to secure versions

## 🛠️ **Step-by-Step Fix Instructions**

### **For Backend:**

1. **Clear npm cache and node_modules:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
```

2. **Install dependencies:**
```bash
npm install
```

3. **If you still get errors, try:**
```bash
npm install --legacy-peer-deps
```

### **For Mobile:**

1. **Clear npm cache and node_modules:**
```bash
cd mobile
rm -rf node_modules package-lock.json
npm cache clean --force
```

2. **Install dependencies:**
```bash
npm install
```

3. **If you still get errors, try:**
```bash
npm install --legacy-peer-deps
```

## 🔒 **Security Fixes**

### **Backend Security Updates:**
- Updated `passport` to `^0.7.0` (fixes high vulnerabilities)
- Updated `pg` to `^8.11.3` (latest stable)
- Updated all `@types/*` packages to latest versions
- Updated ESLint and Prettier to latest versions

### **Mobile Security Updates:**
- Updated `axios` to `^1.6.7` (fixes vulnerabilities)
- Updated `@react-navigation/*` packages to latest
- Updated `expo` to SDK 50 (latest stable)
- Updated `react-native-webview` to latest

## 🚀 **Alternative Installation Methods**

### **If npm install fails, try:**

1. **Using Yarn (recommended):**
```bash
# Install Yarn if you don't have it
npm install -g yarn

# Then install dependencies
cd backend
yarn install

cd ../mobile
yarn install
```

2. **Using npm with specific flags:**
```bash
npm install --no-optional --legacy-peer-deps
```

3. **Using npm ci (for production):**
```bash
npm ci --legacy-peer-deps
```

## 📋 **Verification Steps**

After installation, verify everything works:

### **Backend:**
```bash
cd backend
npm run build
npm run start:dev
```

### **Mobile:**
```bash
cd mobile
npm start
```

## 🔍 **Common Issues & Solutions**

### **Issue 1: ETARGET errors**
**Solution:** Use exact versions instead of ranges
```json
"tsconfig-paths": "4.2.0"  // instead of "^4.2.1"
```

### **Issue 2: Peer dependency warnings**
**Solution:** Use `--legacy-peer-deps` flag
```bash
npm install --legacy-peer-deps
```

### **Issue 3: Security vulnerabilities**
**Solution:** Update to latest stable versions
```bash
npm audit fix --force
```

### **Issue 4: Expo version conflicts**
**Solution:** Use Expo CLI to manage versions
```bash
npx expo install --fix
```

## 🎯 **Recommended Next Steps**

1. **Update your local package.json files** with the provided versions
2. **Clear all caches** and node_modules
3. **Install with legacy peer deps** flag
4. **Run security audit** to verify fixes
5. **Test the applications** to ensure everything works

## 📱 **Platform-Specific Notes**

### **Windows Users:**
- Use PowerShell or Command Prompt as Administrator
- Ensure Node.js version 18+ is installed
- Consider using WSL2 for better compatibility

### **macOS Users:**
- Use Terminal or iTerm2
- Ensure Xcode Command Line Tools are installed
- Consider using Homebrew for package management

### **Linux Users:**
- Use your preferred terminal
- Ensure build-essential is installed
- Consider using nvm for Node.js version management

## ✅ **Success Indicators**

You'll know the fix worked when:
- ✅ No ETARGET errors during installation
- ✅ All packages install successfully
- ✅ Security vulnerabilities are resolved
- ✅ Applications start without errors
- ✅ No peer dependency warnings

## 🆘 **If Problems Persist**

1. **Check Node.js version:** Should be 18+ 
```bash
node --version
npm --version
```

2. **Update npm itself:**
```bash
npm install -g npm@latest
```

3. **Try different package managers:**
```bash
# Yarn
yarn install

# pnpm
npm install -g pnpm
pnpm install
```

4. **Check for conflicting global packages:**
```bash
npm list -g --depth=0
```

---

**🎉 After following these steps, your e-School platform should install and run successfully!**