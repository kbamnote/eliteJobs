#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Building for web..."
npx expo export --platform web

echo "Build completed successfully!"