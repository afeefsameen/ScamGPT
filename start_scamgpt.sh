#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for required dependencies
if ! command_exists python; then
  echo "Error: Python is not installed. Please install Python 3.6 or higher."
  exit 1
fi

if ! command_exists npm; then
  echo "Error: npm is not installed. Please install Node.js and npm."
  exit 1
fi

# Start the backend
echo "Starting ScamGPT backend..."
cd backend
python App.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 3

# Start the frontend
echo "Starting ScamGPT frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Function to handle script termination
cleanup() {
  echo "Stopping ScamGPT..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit 0
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

echo "ScamGPT is running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop"

# Keep the script running
wait $FRONTEND_PID
