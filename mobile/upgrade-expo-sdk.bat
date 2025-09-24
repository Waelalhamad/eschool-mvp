@echo off
echo 🚀 Upgrading Expo SDK from 50 to 54...

REM Clean up existing installations
echo 🧹 Cleaning up existing installations...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm cache clean --force

REM Install Expo CLI globally (latest version)
echo 📦 Installing latest Expo CLI...
npm install -g @expo/cli@latest

REM Install dependencies with legacy peer deps
echo 📦 Installing dependencies...
npm install --legacy-peer-deps

REM Upgrade Expo SDK to 54
echo ⬆️ Upgrading to Expo SDK 54...
npx expo install expo@~54.0.0

REM Install all compatible dependencies
echo 🔧 Installing compatible dependencies...
npx expo install --fix

REM Install additional required packages for SDK 54
echo 📦 Installing additional packages for SDK 54...
npm install --legacy-peer-deps ^
  @expo/vector-icons@^14.0.0 ^
  expo-status-bar@~1.12.1 ^
  react@18.3.1 ^
  react-native@0.76.3 ^
  react-native-gesture-handler@~2.20.2 ^
  react-native-reanimated@~3.16.1 ^
  react-native-safe-area-context@4.12.0 ^
  react-native-screens@4.1.0 ^
  react-native-webview@13.12.2 ^
  @react-native-async-storage/async-storage@1.23.1

REM Fix Metro configuration for SDK 54
echo 🔧 Updating Metro configuration...
(
echo const { getDefaultConfig } = require('expo/metro-config'^);
echo const { withNativeWind } = require('nativewind/metro'^);
echo.
echo const config = getDefaultConfig(__dirname^);
echo.
echo // Add support for nativewind
echo module.exports = withNativeWind(config, { input: './global.css' }^);
) > metro.config.js

REM Clear Metro cache
echo 🧹 Clearing Metro cache...
npx expo start --clear

echo ✅ Expo SDK 54 upgrade completed!
echo.
echo 📋 Next steps:
echo 1. Test the app: npm start
echo 2. If you have native code, run: npx pod-install (iOS^)
echo 3. Check for any breaking changes in your code
echo 4. Update your app configuration if needed
echo.
echo 🎉 Your app is now running on Expo SDK 54!
pause