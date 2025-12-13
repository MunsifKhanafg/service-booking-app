@echo off
echo ========================================
echo Checking Project Configuration
echo ========================================
echo.

echo Checking vite.config.js...
findstr /C:"base: '/service-booking-app/'" vite.config.js >nul
if %errorlevel% equ 0 (
    echo [OK] vite.config.js - base path is correct
) else (
    echo [ERROR] vite.config.js - base path is incorrect
)
echo.

echo Checking if services.json exists...
if exist "public\services.json" (
    echo [OK] services.json found in public folder
) else (
    echo [ERROR] services.json not found!
)
echo.

echo Checking if node_modules exists...
if exist "node_modules\" (
    echo [OK] node_modules installed
) else (
    echo [ERROR] node_modules not found! Run: npm install
)
echo.

echo Checking if gh-pages is installed...
findstr /C:"gh-pages" package.json >nul
if %errorlevel% equ 0 (
    echo [OK] gh-pages is in package.json
    if exist "node_modules\gh-pages\" (
        echo [OK] gh-pages is installed
    ) else (
        echo [WARNING] gh-pages not installed. Run: npm install --save-dev gh-pages
    )
) else (
    echo [WARNING] gh-pages not in package.json. Run: npm install --save-dev gh-pages
)
echo.

echo Checking git status...
git status >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Git repository initialized
    git remote get-url origin >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Git remote configured
        for /f "delims=" %%i in ('git remote get-url origin') do echo     Remote: %%i
    ) else (
        echo [WARNING] Git remote not configured
    )
) else (
    echo [ERROR] Git repository not initialized
)
echo.

echo ========================================
echo Verification Complete
echo ========================================
echo.
echo If everything shows [OK], you're ready to deploy!
echo Run: .\deploy-fix.bat
echo.
pause
