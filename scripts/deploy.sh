#!/bin/bash

# SkillSpark KG Deployment Script
echo "🚀 Starting SkillSpark KG deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found after build."
    exit 1
fi

echo "🎉 Project is ready for deployment!"
echo ""
echo "📋 Next steps:"
echo "1. For Vercel: Run 'npm run deploy:vercel' or visit vercel.com"
echo "2. For Netlify: Run 'npm run deploy:netlify' or visit netlify.com"
echo "3. Upload the 'dist' folder to any static hosting service"
echo ""
echo "📁 Built files are in the 'dist' directory"
