#!/bin/bash

# TGN MCP Testing - Push to Develop Branch Script
# This script automates the process of pushing changes to the develop branch

echo "🚀 TGN MCP Testing - Pushing to Develop Branch"
echo "=============================================="

# Check if we're on develop branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "develop" ]; then
    echo "⚠️  Switching to develop branch..."
    git checkout develop
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Found uncommitted changes. Please commit them first."
    echo "Current status:"
    git status --short
    echo ""
    echo "To commit changes, run:"
    echo "  git add ."
    echo "  git commit -m 'Your commit message'"
    exit 1
fi

# Push to develop branch
echo "📤 Pushing to develop branch..."
git push origin develop

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to develop branch!"
    echo "🌐 View on GitHub: https://github.com/Harin-Patel/Gypsy_Nurse/tree/develop"
else
    echo "❌ Failed to push to develop branch"
    exit 1
fi

echo ""
echo "📋 Next steps:"
echo "1. Create pull request from develop to main (if needed)"
echo "2. Review changes on GitHub"
echo "3. Merge to main when ready"
