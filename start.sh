#!/bin/bash

# Start backend server
echo "Starting backend server..."
node server/index.js &
BACKEND_PID=$!

# Wait for backend to be ready
echo "Waiting for backend to start..."
sleep 3

# Start frontend dev server
echo "Starting frontend dev server..."
npm run dev

# When exiting, kill the backend
trap "kill $BACKEND_PID" EXIT
