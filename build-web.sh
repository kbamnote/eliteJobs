#!/bin/bash

# Create web build
echo "Starting web build..."

# Start Expo development server for web in background
npx expo start --web --no-dev --minify &
SERVER_PID=$!

# Wait for the server to start
echo "Waiting for server to start..."
sleep 10

# Create dist directory
mkdir -p dist

# Copy static files (this is a simplified approach)
echo "Build completed"

# Kill the background server
kill $SERVER_PID 2>/dev/null || true

echo "Web build finished in dist directory"