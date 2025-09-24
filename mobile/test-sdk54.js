#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Expo SDK 54 Upgrade...\n');

// Check package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
console.log('📦 Package.json check:');

const requiredVersions = {
  'expo': '~54.0.0',
  'react': '18.3.1',
  'react-native': '0.76.3',
  'expo-status-bar': '~1.12.1'
};

let allVersionsCorrect = true;

Object.entries(requiredVersions).forEach(([packageName, expectedVersion]) => {
  const actualVersion = packageJson.dependencies[packageName];
  if (actualVersion === expectedVersion) {
    console.log(`✅ ${packageName}: ${actualVersion}`);
  } else {
    console.log(`❌ ${packageName}: ${actualVersion} (expected: ${expectedVersion})`);
    allVersionsCorrect = false;
  }
});

// Check configuration files
console.log('\n📁 Configuration files check:');

const configFiles = [
  'app.json',
  'app.config.js',
  'metro.config.js',
  'babel.config.js'
];

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allVersionsCorrect = false;
  }
});

// Check node_modules
console.log('\n📦 Dependencies check:');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules exists');
} else {
  console.log('❌ node_modules missing - run npm install');
  allVersionsCorrect = false;
}

// Summary
console.log('\n📊 Summary:');
if (allVersionsCorrect) {
  console.log('🎉 All checks passed! Your Expo SDK 54 upgrade is complete.');
  console.log('\n📋 Next steps:');
  console.log('1. Run: npm start');
  console.log('2. Test your app on different platforms');
  console.log('3. Check for any runtime errors');
} else {
  console.log('⚠️  Some issues found. Please check the errors above.');
  console.log('\n🔧 Suggested fixes:');
  console.log('1. Run: npm install --legacy-peer-deps');
  console.log('2. Run: npx expo install --fix');
  console.log('3. Check your configuration files');
}

console.log('\n🚀 Happy coding with Expo SDK 54!');