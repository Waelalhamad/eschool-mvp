#!/bin/bash

echo "🔧 Fixing Babel Configuration Error..."

# Check if NativeWind is properly installed
if npm list nativewind > /dev/null 2>&1; then
    echo "✅ NativeWind is installed"
    
    # Check if nativewind/babel plugin exists
    if [ -d "node_modules/nativewind/babel" ]; then
        echo "✅ NativeWind babel plugin found"
        
        # Create babel config with NativeWind
        cat > babel.config.js << 'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
EOF
        echo "✅ Created babel.config.js with NativeWind support"
    else
        echo "❌ NativeWind babel plugin not found"
        echo "🔧 Creating babel config without NativeWind..."
        
        # Create basic babel config
        cat > babel.config.js << 'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
EOF
        echo "✅ Created basic babel.config.js"
    fi
else
    echo "❌ NativeWind not installed"
    echo "🔧 Creating basic babel config..."
    
    # Create basic babel config
    cat > babel.config.js << 'EOF'
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
EOF
    echo "✅ Created basic babel.config.js without NativeWind"
fi

# Clear Metro cache
echo "🧹 Clearing Metro cache..."
npx expo start --clear

echo "✅ Babel configuration fixed!"
echo ""
echo "📋 Next steps:"
echo "1. Test the app: npm start"
echo "2. If you want NativeWind, install it properly:"
echo "   npm install nativewind@^2.0.11 --legacy-peer-deps"
echo "3. Check for any remaining babel errors"
echo ""
echo "🎉 Your mobile app should now start without babel errors!"