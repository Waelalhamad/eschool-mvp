@echo off
echo 🔧 Starting NPM Fix Process...

echo 📦 Fixing Backend Dependencies...
cd backend

echo 🧹 Cleaning up...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 🧽 Clearing npm cache...
npm cache clean --force

echo 📥 Installing dependencies with legacy peer deps...
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo ❌ Backend installation failed. Trying alternative method...
    npm install --no-optional --legacy-peer-deps
) else (
    echo ✅ Backend dependencies installed successfully!
)

echo 🔒 Running security audit...
npm audit fix --force

cd ..

echo.
echo ⏳ Waiting 2 seconds before fixing mobile...
timeout /t 2 /nobreak >nul

echo 📱 Fixing Mobile Dependencies...
cd mobile

echo 🧹 Cleaning up...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 🧽 Clearing npm cache...
npm cache clean --force

echo 📥 Installing dependencies with legacy peer deps...
npm install --legacy-peer-deps

if %errorlevel% neq 0 (
    echo ❌ Mobile installation failed. Trying alternative method...
    npm install --no-optional --legacy-peer-deps
) else (
    echo ✅ Mobile dependencies installed successfully!
)

echo 🔒 Running security audit...
npm audit fix --force

cd ..

echo.
echo 🎉 Fix process completed!
echo.
echo 📋 Next steps:
echo 1. Test backend: cd backend ^&^& npm run start:dev
echo 2. Test mobile: cd mobile ^&^& npm start
echo.
echo 🔍 If you still encounter issues, check the NPM_FIX_GUIDE.md file

pause