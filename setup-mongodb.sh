#!/bin/bash

echo "🍃 Setting up MongoDB for e-School..."

# Detect OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📱 Detected macOS"
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "🍺 Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Install MongoDB
    echo "📦 Installing MongoDB..."
    brew tap mongodb/brew
    brew install mongodb-community
    
    # Start MongoDB
    echo "🚀 Starting MongoDB..."
    brew services start mongodb/brew/mongodb-community
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Detected Linux"
    
    # Update package list
    sudo apt-get update
    
    # Install MongoDB
    echo "📦 Installing MongoDB..."
    sudo apt-get install -y mongodb
    
    # Start MongoDB
    echo "🚀 Starting MongoDB..."
    sudo systemctl start mongodb
    sudo systemctl enable mongodb
    
else
    echo "❌ Unsupported OS. Please install MongoDB manually:"
    echo "   https://docs.mongodb.com/manual/installation/"
    exit 1
fi

# Wait for MongoDB to start
echo "⏳ Waiting for MongoDB to start..."
sleep 5

# Check if MongoDB is running
if pgrep mongod > /dev/null; then
    echo "✅ MongoDB is running!"
else
    echo "❌ MongoDB failed to start. Please check the installation."
    exit 1
fi

# Create database and test connection
echo "🔧 Creating e-School database..."
mongosh --eval "use eschool; db.test.insertOne({message: 'e-School MongoDB setup complete', timestamp: new Date()})" --quiet

if [ $? -eq 0 ]; then
    echo "✅ Database created successfully!"
    echo "📊 Database: eschool"
    echo "🔗 Connection: mongodb://localhost:27017/eschool"
else
    echo "❌ Failed to create database. Please check MongoDB connection."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend

# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force

# Install with MongoDB dependencies
npm install --legacy-peer-deps

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed!"
else
    echo "❌ Failed to install dependencies."
    exit 1
fi

# Test backend build
echo "🏗️ Testing backend build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Backend builds successfully!"
else
    echo "❌ Backend build failed. Check for errors."
    exit 1
fi

echo ""
echo "🎉 MongoDB setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend: cd backend && npm run start:dev"
echo "2. Test the health endpoint: curl http://localhost:3000/health"
echo "3. Check MongoDB Compass: https://www.mongodb.com/products/compass"
echo ""
echo "🔗 MongoDB Connection String: mongodb://localhost:27017/eschool"
echo "🌐 Backend URL: http://localhost:3000"
echo ""
echo "🚀 Your e-School platform is ready with MongoDB!"