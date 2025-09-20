#!/usr/bin/env bash

# SkillSpark KG - Simple Deploy Script
echo "🚀 Building SkillSpark KG..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Built files are in the 'dist' directory"
    echo "🌐 Ready for deployment to Vercel/Netlify!"
else
    echo "❌ Build failed!"
    exit 1
fi