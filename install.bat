@echo off
echo Installing Video Production App Dependencies...
echo.

echo Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error installing root dependencies
    pause
    exit /b 1
)

echo.
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error installing server dependencies
    pause
    exit /b 1
)

echo.
echo Installing client dependencies...
cd ..\client
call npm install
if %errorlevel% neq 0 (
    echo Error installing client dependencies
    pause
    exit /b 1
)

cd ..
echo.
echo Creating uploads directory...
if not exist "server\uploads" mkdir server\uploads

echo.
echo Installation complete!
echo.
echo Next steps:
echo 1. Copy server\.env.example to server\.env
echo 2. Configure your database settings in server\.env
echo 3. Run: npm run dev
echo.
pause
