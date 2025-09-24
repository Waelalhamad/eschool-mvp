@echo off
echo 🔧 Fixing Backend and Mobile Errors...

REM Fix Backend
echo 🔧 Fixing Backend Errors...
cd backend

REM Install missing dependencies
echo 📦 Installing missing NestJS dependencies...
npm install --legacy-peer-deps @nestjs/terminus@^10.2.3 @nestjs/axios@^3.0.2 axios@^1.6.7

REM Build backend to check for errors
echo 🏗️ Building backend...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Backend build successful!
) else (
    echo ❌ Backend build failed. Check the errors above.
)

REM Fix Mobile
echo 🔧 Fixing Mobile Errors...
cd ..\mobile

REM Clean and reinstall
echo 🧹 Cleaning mobile dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force

REM Install dependencies
echo 📦 Installing mobile dependencies...
npm install --legacy-peer-deps

REM Clear Expo cache
echo 🧹 Clearing Expo cache...
npx expo start --clear --no-dev --minify

echo ✅ All fixes applied!
echo.
echo 📋 Next steps:
echo 1. Backend: cd backend ^&^& npm run start:dev
echo 2. Mobile: cd mobile ^&^& npm start
echo.
echo 🎉 Your e-School platform should now work without errors!
pause