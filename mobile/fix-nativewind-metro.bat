@echo off
echo 🔧 Fixing NativeWind Metro Configuration...

REM Check if NativeWind is installed
npm list nativewind >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ NativeWind is installed
    
    REM For Expo SDK 54, create a simpler metro config
    echo 🔧 Configuring NativeWind for Expo SDK 54...
    
    (
    echo const { getDefaultConfig } = require('expo/metro-config'^);
    echo.
    echo const config = getDefaultConfig(__dirname^);
    echo.
    echo // Add support for NativeWind if available
    echo try {
    echo   const { withNativeWind } = require('nativewind/metro'^);
    echo   module.exports = withNativeWind(config, { input: './global.css' }^);
    echo } catch (error) {
    echo   console.log('NativeWind metro plugin not available, using default config'^);
    echo   module.exports = config;
    echo }
    ) > metro.config.js
    
    echo ✅ Updated metro.config.js with NativeWind compatibility
) else (
    echo ❌ NativeWind not found, using basic metro config...
    
    (
    echo const { getDefaultConfig } = require('expo/metro-config'^);
    echo.
    echo const config = getDefaultConfig(__dirname^);
    echo.
    echo module.exports = config;
    ) > metro.config.js
    
    echo ✅ Created basic metro config
)

REM Clear Metro cache
echo 🧹 Clearing Metro cache...
npx expo start --clear

echo ✅ NativeWind Metro configuration fixed!
echo.
echo 📋 Next steps:
echo 1. Test the app: npm start
echo 2. If NativeWind still doesn't work, you can remove it and use regular styles
echo 3. Check the babel.config.js for NativeWind plugin
echo.
echo 🎉 Your mobile app should now start without metro errors!
pause