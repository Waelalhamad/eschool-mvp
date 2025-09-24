@echo off
echo 🍃 Setting up MongoDB for e-School...

REM Check if MongoDB is already installed
where mongod >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ MongoDB is already installed
    goto :start_mongodb
)

echo 📦 MongoDB not found. Please install MongoDB manually:
echo    1. Download from: https://www.mongodb.com/try/download/community
echo    2. Run the installer
echo    3. Add MongoDB to your PATH
echo    4. Run this script again
echo.
echo Press any key to open MongoDB download page...
pause >nul
start https://www.mongodb.com/try/download/community
exit /b 1

:start_mongodb
echo 🚀 Starting MongoDB...

REM Try to start MongoDB as a service
net start MongoDB >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ MongoDB service started
    goto :test_connection
)

REM If service start failed, try to start manually
echo ⚠️ Service start failed, trying manual start...
mongod --dbpath C:\data\db --logpath C:\data\log\mongod.log --fork >nul 2>nul
if %errorlevel% equ 0 (
    echo ✅ MongoDB started manually
    goto :test_connection
)

echo ❌ Failed to start MongoDB. Please check installation.
echo    Make sure MongoDB is properly installed and configured.
exit /b 1

:test_connection
echo ⏳ Waiting for MongoDB to start...
timeout /t 5 /nobreak >nul

echo 🔧 Creating e-School database...
mongosh --eval "use eschool; db.test.insertOne({message: 'e-School MongoDB setup complete', timestamp: new Date()})" --quiet

if %errorlevel% equ 0 (
    echo ✅ Database created successfully!
    echo 📊 Database: eschool
    echo 🔗 Connection: mongodb://localhost:27017/eschool
) else (
    echo ❌ Failed to create database. Please check MongoDB connection.
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend

REM Clean install
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force

REM Install with MongoDB dependencies
npm install --legacy-peer-deps

if %errorlevel% equ 0 (
    echo ✅ Backend dependencies installed!
) else (
    echo ❌ Failed to install dependencies.
    exit /b 1
)

REM Test backend build
echo 🏗️ Testing backend build...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Backend builds successfully!
) else (
    echo ❌ Backend build failed. Check for errors.
    exit /b 1
)

echo.
echo 🎉 MongoDB setup complete!
echo.
echo 📋 Next steps:
echo 1. Start the backend: cd backend ^&^& npm run start:dev
echo 2. Test the health endpoint: curl http://localhost:3000/health
echo 3. Check MongoDB Compass: https://www.mongodb.com/products/compass
echo.
echo 🔗 MongoDB Connection String: mongodb://localhost:27017/eschool
echo 🌐 Backend URL: http://localhost:3000
echo.
echo 🚀 Your e-School platform is ready with MongoDB!
pause