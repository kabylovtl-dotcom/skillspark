# SkillSpark KG - Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# For production deployment
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the Vite configuration
6. Click "Deploy"

## 🌐 Deploy to Netlify

### Option 1: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy to Netlify
netlify deploy

# For production deployment
netlify deploy --prod
```

### Option 2: Deploy via Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with GitHub
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

## 📋 Pre-deployment Checklist

- [ ] Remove any sensitive API keys from code
- [ ] Update API endpoints for production if needed
- [ ] Test the build locally: `npm run build`
- [ ] Check that all routes work with client-side routing
- [ ] Verify AI Assistant works with production API keys

## 🔧 Environment Variables

For production deployment, you may need to set these environment variables:

### Vercel
- Go to Project Settings > Environment Variables
- Add your OpenAI API key as `VITE_OPENAI_API_KEY`

### Netlify
- Go to Site Settings > Environment Variables
- Add your OpenAI API key as `VITE_OPENAI_API_KEY`

## 🎯 Features Included

✅ **Responsive Design** - Works on all devices
✅ **Multi-language Support** - English, Russian, Kyrgyz
✅ **Dark/Light Theme** - Automatic theme switching
✅ **AI Assistant** - Floating sidebar with ChatGPT integration
✅ **Physics Simulations** - Interactive learning tools
✅ **SEO Optimized** - Meta tags and proper routing
✅ **Fast Loading** - Optimized Vite build

## 🌟 Live Demo

Once deployed, your site will be available at:
- **Vercel**: `https://your-project-name.vercel.app`
- **Netlify**: `https://your-project-name.netlify.app`

## 📞 Support

If you encounter any issues during deployment, check:
1. Build logs for errors
2. Environment variables are set correctly
3. API endpoints are accessible
4. All dependencies are properly installed
