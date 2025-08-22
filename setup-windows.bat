@echo off
echo ========================================
echo Nothing Better Health - Windows Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
node --version
echo.

echo Cleaning old files...
if exist node_modules (
    echo Removing old node_modules...
    rmdir /s /q node_modules
)
if exist .next (
    echo Removing old .next build folder...
    rmdir /s /q .next
)
if exist package-lock.json (
    echo Removing old package-lock.json...
    del package-lock.json
)
echo.

echo Installing dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo To build for production, run:
echo   npm run build
echo.
echo The site will be available at:
echo   http://localhost:3000
echo.
pause