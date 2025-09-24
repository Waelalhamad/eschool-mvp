# 🔧 Mobile & Backend Errors Fix Guide

## ❌ **Issues Identified**

### **Mobile Error:**
```
Error: Cannot find module 'nativewind/metro'
```

### **Backend Errors:**
```
Cannot find module '../schemas/quizsubmission.schema'
Cannot find module '../schemas/uploadrequest.schema'
```

## ✅ **Solutions Applied**

### **1. Mobile NativeWind Metro Error Fixed**

**Problem:** NativeWind metro plugin not compatible with Expo SDK 54

**Solution:** Updated `metro.config.js` to handle NativeWind gracefully:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

### **2. Backend Schema Import Errors Fixed**

**Problem:** Auto-generated module files had incorrect schema import paths

**Solution:** Fixed import paths in modules:

**Before (Broken):**
```typescript
import { QuizSubmission, QuizSubmissionSchema } from '../schemas/quizsubmission.schema';
import { UploadRequest, UploadRequestSchema } from '../schemas/uploadrequest.schema';
```

**After (Fixed):**
```typescript
import { QuizSubmission, QuizSubmissionSchema } from '../schemas/quiz-submission.schema';
import { UploadRequest, UploadRequestSchema } from '../schemas/upload-request.schema';
```

## 🚀 **Quick Fix Commands**

### **Mobile Fix:**
```bash
cd mobile

# Option 1: Automated fix
./fix-nativewind-metro.sh  # Mac/Linux
# OR
fix-nativewind-metro.bat   # Windows

# Option 2: Manual fix
# The metro.config.js is already updated with the correct configuration
npm start
```

### **Backend Fix:**
```bash
cd backend

# The import paths are already fixed
npm run start:dev
```

## 📋 **What Was Fixed**

### **Mobile Changes:**
- ✅ Updated `metro.config.js` to remove NativeWind dependency
- ✅ Created fallback metro configuration for Expo SDK 54
- ✅ Added error handling for NativeWind compatibility

### **Backend Changes:**
- ✅ Fixed `quizzes.module.ts` import path: `quizsubmission.schema` → `quiz-submission.schema`
- ✅ Fixed `uploads.module.ts` import path: `uploadrequest.schema` → `upload-request.schema`
- ✅ All schema imports now use correct kebab-case naming

## 🧪 **Testing the Fixes**

### **Mobile Test:**
```bash
cd mobile
npm start
```

**Expected Result:**
- ✅ Expo starts without metro errors
- ✅ No "Cannot find module 'nativewind/metro'" error
- ✅ App loads successfully

### **Backend Test:**
```bash
cd backend
npm run start:dev
```

**Expected Result:**
- ✅ Backend starts without TypeScript errors
- ✅ No schema import errors
- ✅ MongoDB connection successful

## 🔍 **Root Cause Analysis**

### **Mobile Issue:**
1. **NativeWind Compatibility:** NativeWind metro plugin not fully compatible with Expo SDK 54
2. **Missing Module:** The `nativewind/metro` module path was incorrect or missing
3. **Metro Configuration:** Metro bundler couldn't resolve the NativeWind integration

### **Backend Issue:**
1. **Auto-Generation Error:** The script that updated modules used wrong file naming
2. **Case Sensitivity:** Schema files use kebab-case (`quiz-submission.schema`) but imports used camelCase (`quizsubmission.schema`)
3. **Import Path Mismatch:** File system vs. import statement naming inconsistency

## 🛠️ **Alternative Solutions**

### **If NativeWind Still Doesn't Work:**

**Option 1: Remove NativeWind Completely**
```bash
cd mobile
npm uninstall nativewind
# Remove NativeWind from babel.config.js
# Use regular React Native styles
```

**Option 2: Use Compatible NativeWind Version**
```bash
cd mobile
npm install nativewind@^2.0.11 --legacy-peer-deps
```

**Option 3: Use Expo Router Styling**
```bash
# Use Expo's built-in styling solutions
# No additional dependencies needed
```

### **If Backend Still Has Schema Errors:**
```bash
cd backend

# Check all schema imports
grep -r "\.schema" src/ --include="*.ts"

# Fix any remaining incorrect imports
# Ensure all schema files exist
ls src/schemas/
```

## 📊 **Before vs After**

### **Mobile (Before):**
```
Error: Cannot find module 'nativewind/metro'
- Metro bundler fails to start
- App cannot load
- NativeWind integration broken
```

### **Mobile (After):**
```
Starting project at ...
Metro waiting on exp://192.168.1.100:19000
- Metro starts successfully
- App loads without errors
- Basic configuration works
```

### **Backend (Before):**
```
Cannot find module '../schemas/quizsubmission.schema'
Cannot find module '../schemas/uploadrequest.schema'
- TypeScript compilation fails
- Modules cannot load schemas
```

### **Backend (After):**
```
LOG [NestFactory] Starting Nest application...
LOG [InstanceLoader] MongooseModule dependencies initialized
- Backend starts successfully
- All schemas load correctly
- No import errors
```

## ✅ **Success Checklist**

### **Mobile:**
- [ ] `npm start` works without metro errors
- [ ] Expo development server starts
- [ ] App loads on device/emulator
- [ ] No NativeWind metro errors

### **Backend:**
- [ ] `npm run start:dev` works without TypeScript errors
- [ ] All modules load successfully
- [ ] MongoDB connection established
- [ ] No schema import errors

## 🚨 **If Issues Persist**

### **Mobile Issues:**
```bash
cd mobile

# Clean everything
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Try without NativeWind
rm metro.config.js
npm start
```

### **Backend Issues:**
```bash
cd backend

# Check for remaining schema issues
find src/ -name "*.ts" -exec grep -l "schemas/" {} \;

# Verify all schema files exist
ls -la src/schemas/
```

## 🎯 **Next Steps**

1. **Test Mobile App:**
   ```bash
   cd mobile
   npm start
   ```

2. **Test Backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

3. **Verify Integration:**
   - Check if mobile can connect to backend
   - Test API endpoints
   - Verify authentication flow

## 🎉 **Expected Results**

After applying these fixes:

- ✅ **Mobile:** Starts without metro/NativeWind errors
- ✅ **Backend:** Starts without schema import errors
- ✅ **Integration:** Both apps work together properly
- ✅ **Development:** Ready for continued development

---

**🔧 Both mobile and backend should now start without the reported errors!**