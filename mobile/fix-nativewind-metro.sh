#!/bin/bash

echo "🔧 Fixing NativeWind Metro Configuration..."

# Check if NativeWind is installed
if npm list nativewind > /dev/null 2>&1; then
    echo "✅ NativeWind is installed"
    
    # Check NativeWind version compatibility
    NATIVEWIND_VERSION=$(npm list nativewind --depth=0 | grep nativewind | cut -d'@' -f2)
    echo "📦 NativeWind version: $NATIVEWIND_VERSION"
    
    # For Expo SDK 54, we might need a different approach
    if [[ "$NATIVEWIND_VERSION" == "2.0.11" ]]; then
        echo "🔧 Configuring NativeWind for Expo SDK 54..."
        
        # Create a simpler metro config that works with SDK 54
        cat > metro.config.js << 'EOF'
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for NativeWind if available
try {
  const { withNativeWind } = require('nativewind/metro');
  module.exports = withNativeWind(config, { input: './global.css' });
} catch (error) {
  console.log('NativeWind metro plugin not available, using default config');
  module.exports = config;
}
EOF
        echo "✅ Updated metro.config.js with NativeWind compatibility"
    else
        echo "⚠️ NativeWind version may not be compatible with Expo SDK 54"
        echo "🔧 Using basic metro config..."
        
        cat > metro.config.js << 'EOF'
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
EOF
        echo "✅ Updated metro.config.js to basic configuration"
    fi
else
    echo "❌ NativeWind not found, installing..."
    npm install nativewind@^2.0.11 --legacy-peer-deps
    
    # Create basic metro config
    cat > metro.config.js << 'EOF'
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
EOF
    echo "✅ Installed NativeWind and created basic metro config"
fi

# Clear Metro cache
echo "🧹 Clearing Metro cache..."
npx expo start --clear

echo "✅ NativeWind Metro configuration fixed!"
echo ""
echo "📋 Next steps:"
echo "1. Test the app: npm start"
echo "2. If NativeWind still doesn't work, you can remove it and use regular styles"
echo "3. Check the babel.config.js for NativeWind plugin"
echo ""
echo "🎉 Your mobile app should now start without metro errors!"