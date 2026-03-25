@echo off
echo Starting backend server...
start "Backend Server" node server/index.js

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak

echo Starting frontend dev server...
npm run dev

echo Both servers running!
echo Frontend: http://localhost:5173 or http://localhost:5174 or http://localhost:5175
echo Backend: http://localhost:5000
