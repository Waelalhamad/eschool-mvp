#!/bin/bash

echo "🔧 Starting NPM Fix Process..."

# Function to fix backend
fix_backend() {
    echo "📦 Fixing Backend Dependencies..."
    cd backend
    
    echo "🧹 Cleaning up..."
    rm -rf node_modules package-lock.json
    
    echo "🧽 Clearing npm cache..."
    npm cache clean --force
    
    echo "📥 Installing dependencies with legacy peer deps..."
    npm install --legacy-peer-deps
    
    if [ $? -eq 0 ]; then
        echo "✅ Backend dependencies installed successfully!"
    else
        echo "❌ Backend installation failed. Trying alternative method..."
        npm install --no-optional --legacy-peer-deps
    fi
    
    echo "🔒 Running security audit..."
    npm audit fix --force
    
    cd ..
}

# Function to fix mobile
fix_mobile() {
    echo "📱 Fixing Mobile Dependencies..."
    cd mobile
    
    echo "🧹 Cleaning up..."
    rm -rf node_modules package-lock.json
    
    echo "🧽 Clearing npm cache..."
    npm cache clean --force
    
    echo "📥 Installing dependencies with legacy peer deps..."
    npm install --legacy-peer-deps
    
    if [ $? -eq 0 ]; then
        echo "✅ Mobile dependencies installed successfully!"
    else
        echo "❌ Mobile installation failed. Trying alternative method..."
        npm install --no-optional --legacy-peer-deps
    fi
    
    echo "🔒 Running security audit..."
    npm audit fix --force
    
    cd ..
}

# Main execution
echo "🚀 Starting the fix process..."

# Fix backend
fix_backend

echo ""
echo "⏳ Waiting 2 seconds before fixing mobile..."
sleep 2

# Fix mobile
fix_mobile

echo ""
echo "🎉 Fix process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Test backend: cd backend && npm run start:dev"
echo "2. Test mobile: cd mobile && npm start"
echo ""
echo "🔍 If you still encounter issues, check the NPM_FIX_GUIDE.md file"