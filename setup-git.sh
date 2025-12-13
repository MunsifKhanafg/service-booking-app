#!/bin/bash

# Service Booking App - GitHub Setup & Deployment Script

echo "=================================="
echo "Service Booking App - Git Setup"
echo "=================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "✓ Git is installed"
echo ""

# Initialize git repository
echo "📦 Initializing Git repository..."
git init

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Service Booking Web App with 30 services"

echo ""
echo "✅ Git repository initialized successfully!"
echo ""
echo "=================================="
echo "Next Steps:"
echo "=================================="
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Run these commands (replace YOUR_USERNAME and YOUR_REPO):"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. To deploy to GitHub Pages:"
echo "   npm install --save-dev gh-pages"
echo "   npm run deploy"
echo ""
echo "4. Or deploy to Netlify/Vercel by connecting your GitHub repo"
echo ""
echo "=================================="
echo "Quick Commands:"
echo "=================================="
echo ""
echo "Development:  npm run dev"
echo "Build:        npm run build"
echo "Preview:      npm run preview"
echo ""
