#!/bin/bash

echo "🔧 Fixing Backend and Mobile Errors..."

# Fix Backend
echo "🔧 Fixing Backend Errors..."
cd backend

# Install missing dependencies
echo "📦 Installing missing NestJS dependencies..."
npm install --legacy-peer-deps @nestjs/terminus@^10.2.3 @nestjs/axios@^3.0.2 axios@^1.6.7

# Build backend to check for errors
echo "🏗️ Building backend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Backend build successful!"
else
    echo "❌ Backend build failed. Check the errors above."
fi

# Fix Mobile
echo "🔧 Fixing Mobile Errors..."
cd ../mobile

# Clean and reinstall
echo "🧹 Cleaning mobile dependencies..."
rm -rf node_modules package-lock.json
npm cache clean --force

# Install dependencies
echo "📦 Installing mobile dependencies..."
npm install --legacy-peer-deps

# Clear Expo cache
echo "🧹 Clearing Expo cache..."
npx expo start --clear --no-dev --minify

echo "✅ All fixes applied!"
echo ""
echo "📋 Next steps:"
echo "1. Backend: cd backend && npm run start:dev"
echo "2. Mobile: cd mobile && npm start"
echo ""
echo "🎉 Your e-School platform should now work without errors!"