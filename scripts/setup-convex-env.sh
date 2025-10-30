#!/bin/bash

echo "🚀 Setting up Convex environment variables..."
echo ""

# Check if convex is already running
if ! pnpm convex env list &> /dev/null; then
  echo "❌ Error: Convex deployment not found!"
  echo ""
  echo "Please run 'pnpm convex dev' first to create a deployment."
  echo "Then run this script again."
  exit 1
fi

# Generate auth secret
SECRET=$(openssl rand -base64 32)

# Set environment variables
echo "Setting SITE_URL..."
pnpm convex env set SITE_URL http://localhost:5173

echo "Setting BETTER_AUTH_SECRET..."
pnpm convex env set BETTER_AUTH_SECRET "$SECRET"

echo ""
echo "✅ Convex environment variables configured!"
echo ""
echo "Next steps:"
echo "  1. Make sure 'pnpm convex dev' is running (in Terminal 1)"
echo "  2. Run 'pnpm dev' (in Terminal 2)"
echo "  3. Open http://localhost:5173"
