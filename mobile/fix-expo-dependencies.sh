#!/bin/bash

echo "🔧 Fixing Expo SDK 54 Dependency Conflicts..."

# Clean everything
echo "🧹 Cleaning existing installation..."
rm -rf node_modules
rm -f package-lock.json
npm cache clean --force

# Remove any existing Expo CLI
echo "🗑️ Removing old Expo CLI..."
npm uninstall -g expo-cli @expo/cli

# Install latest Expo CLI
echo "📦 Installing latest Expo CLI..."
npm install -g @expo/cli@latest

# Install dependencies with legacy peer deps
echo "📦 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Use Expo install to fix versions
echo "🔧 Using Expo install to fix dependency versions..."
npx expo install --fix

# Install specific compatible versions
echo "📦 Installing Expo SDK 54 compatible versions..."
npm install --legacy-peer-deps \
  react@18.2.0 \
  react-native@0.74.5 \
  expo@~54.0.0 \
  expo-status-bar@~1.12.1 \
  @expo/vector-icons@^14.0.0 \
  react-native-gesture-handler@~2.16.1 \
  react-native-reanimated@~3.10.1 \
  react-native-safe-area-context@4.10.5 \
  react-native-screens@3.31.1 \
  react-native-webview@13.8.6 \
  @react-native-async-storage/async-storage@1.23.1

# Clear Metro cache
echo "🧹 Clearing Metro cache..."
npx expo start --clear

echo "✅ Dependency conflicts fixed!"
echo ""
echo "📋 Next steps:"
echo "1. Test the installation: npm start"
echo "2. If issues persist, try: npm install --force"
echo "3. Check for any remaining peer dependency warnings"
echo ""
echo "🎉 Your Expo SDK 54 app should now install successfully!"