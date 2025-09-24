# 🚀 Backend Setup Guide

## ✅ **Problem Fixed**

The error `Could not find TypeScript configuration file "tsconfig.json"` has been resolved by creating all necessary configuration files.

## 📁 **Files Created**

### **Core Configuration Files:**
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tsconfig.build.json` - Build-specific TypeScript config
- ✅ `nest-cli.json` - NestJS CLI configuration
- ✅ `jest.config.js` - Jest testing configuration
- ✅ `test/jest-e2e.json` - End-to-end test configuration

### **Code Quality Files:**
- ✅ `.eslintrc.js` - ESLint configuration
- ✅ `.prettierrc` - Prettier code formatting
- ✅ `.gitignore` - Git ignore patterns

### **Environment Files:**
- ✅ `.env` - Environment variables (development)
- ✅ `.env.example` - Environment variables template

### **Application Files:**
- ✅ `src/app.controller.ts` - Main app controller
- ✅ `src/app.service.ts` - Main app service
- ✅ `test/app.e2e-spec.ts` - End-to-end test

## 🛠️ **Setup Instructions**

### **1. Install Dependencies**
```bash
cd backend
npm install --legacy-peer-deps
```

### **2. Set Up Database (PostgreSQL)**
Make sure PostgreSQL is running and create the database:
```sql
-- Connect to PostgreSQL and run:
CREATE DATABASE eschool;
```

### **3. Update Environment Variables**
Edit `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=eschool
```

### **4. Run the Application**
```bash
# Development mode
npm run start:dev

# Or build and run
npm run build
npm run start
```

## 🧪 **Testing**

### **Unit Tests:**
```bash
npm run test
```

### **End-to-End Tests:**
```bash
npm run test:e2e
```

### **Test Coverage:**
```bash
npm run test:cov
```

## 📊 **Available Scripts**

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## 🌐 **API Endpoints**

Once running, the API will be available at:
- **Base URL:** `http://localhost:3000`
- **Health Check:** `GET /health`
- **API Documentation:** `http://localhost:3000/api` (Swagger)

### **Available Routes:**
- `GET /` - Hello World
- `GET /health` - Health check
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/refresh` - Refresh token
- `GET /auth/profile` - Get user profile
- `PATCH /auth/profile` - Update user profile

## 🔧 **Configuration Details**

### **TypeScript Configuration (`tsconfig.json`):**
- Target: ES2020
- Module: CommonJS
- Decorators enabled
- Source maps enabled
- Path mapping configured

### **Database Configuration:**
- TypeORM with PostgreSQL
- Auto-synchronization in development
- Migration support
- Entity auto-discovery

### **Security Configuration:**
- JWT authentication
- Password hashing with bcryptjs
- CORS enabled for React Native
- Input validation with class-validator

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Database Connection Error:**
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **Port Already in Use:**
   - Change PORT in `.env` file
   - Or kill the process using the port

3. **Module Not Found:**
   - Run `npm install` again
   - Clear node_modules and reinstall

4. **TypeScript Errors:**
   - Check `tsconfig.json` syntax
   - Ensure all imports are correct

### **Reset Everything:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --legacy-peer-deps

# Rebuild
npm run build
```

## 🎯 **Next Steps**

1. **Start the backend:**
   ```bash
   npm run start:dev
   ```

2. **Verify it's working:**
   - Visit `http://localhost:3000` - should show "Hello World!"
   - Visit `http://localhost:3000/health` - should show health status
   - Visit `http://localhost:3000/api` - should show Swagger documentation

3. **Test the mobile app connection:**
   - Make sure the mobile app points to `http://localhost:3000`
   - Test authentication endpoints

## ✅ **Success Indicators**

You'll know everything is working when:
- ✅ Backend starts without errors
- ✅ Health endpoint returns status
- ✅ Swagger documentation loads
- ✅ Database connects successfully
- ✅ All tests pass

---

**🎉 Your backend should now be fully configured and ready to run!**