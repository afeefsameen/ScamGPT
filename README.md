# ScamGPT - Essential Files

This directory contains the essential files needed to run the ScamGPT project.

## Project Structure

### Backend (Flask)
- `backend/App.py` - Main Flask application
- `backend/language_support.py` - Language detection and support
- `backend/model/` - ML model and data files

### Frontend (React)
- `frontend/src/App.js` - Main React component
- `frontend/src/components/` - UI components
- `frontend/public/` - Static files

## How to Run

### Using the Start Script (Recommended)

#### Simple Start Command (Works on all platforms):
```
./start
```

#### On Linux/macOS:
```
./start_scamgpt.sh
```

#### On Windows:
```
start_scamgpt.bat
```

### Manual Start

1. Start the backend:
```
cd backend
pip install -r requirements.txt
python App.py
```

2. Start the frontend:
```
cd frontend
npm install
npm start
```

3. Open http://localhost:3000 in your browser

## Features

1. Scam detection with detailed explanations
2. Multi-language support
3. Authority contact information
4. Educational content about scams
