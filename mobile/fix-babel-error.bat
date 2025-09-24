@echo off
echo 🔧 Fixing Babel Configuration Error...

REM Check if NativeWind is properly installed
npm list nativewind >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ NativeWind is installed
    
    REM Check if nativewind/babel plugin exists
    if exist "node_modules\nativewind\babel" (
        echo ✅ NativeWind babel plugin found
        
        REM Create babel config with NativeWind
        (
        echo module.exports = function (api^) {
        echo   api.cache(true^);
        echo   return {
        echo     presets: ['babel-preset-expo'],
        echo     plugins: ['nativewind/babel'],
        echo   };
        echo };
        ) > babel.config.js
        
        echo ✅ Created babel.config.js with NativeWind support
    ) else (
        echo ❌ NativeWind babel plugin not found
        echo 🔧 Creating babel config without NativeWind...
        
        REM Create basic babel config
        (
        echo module.exports = function (api^) {
        echo   api.cache(true^);
        echo   return {
        echo     presets: ['babel-preset-expo'],
        echo   };
        echo };
        ) > babel.config.js
        
        echo ✅ Created basic babel.config.js
    )
) else (
    echo ❌ NativeWind not installed
    echo 🔧 Creating basic babel config...
    
    REM Create basic babel config
    (
    echo module.exports = function (api^) {
    echo   api.cache(true^);
    echo   return {
    echo     presets: ['babel-preset-expo'],
    echo   };
    echo };
    ) > babel.config.js
    
    echo ✅ Created basic babel.config.js without NativeWind
)

REM Clear Metro cache
echo 🧹 Clearing Metro cache...
npx expo start --clear

echo ✅ Babel configuration fixed!
echo.
echo 📋 Next steps:
echo 1. Test the app: npm start
echo 2. If you want NativeWind, install it properly:
echo    npm install nativewind@^2.0.11 --legacy-peer-deps
echo 3. Check for any remaining babel errors
echo.
echo 🎉 Your mobile app should now start without babel errors!
pause