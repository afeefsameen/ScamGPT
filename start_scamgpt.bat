@echo off
echo Starting ScamGPT...

REM Start the backend
start cmd /k "cd backend && python App.py"

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start the frontend
start cmd /k "cd frontend && npm start"

echo ScamGPT is running!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
