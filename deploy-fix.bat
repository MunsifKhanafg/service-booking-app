@echo off
echo ========================================
echo Service Booking App - Deploy to GitHub Pages
echo ========================================
echo.

echo Step 1: Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Build successful!
echo.

echo Step 2: Adding files to git...
git add .
git commit -m "Fix: Updated services.json path for GitHub Pages deployment"
if %errorlevel% neq 0 (
    echo [WARNING] Nothing to commit or commit failed
)
echo.

echo Step 3: Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push failed! Make sure you have:
    echo   1. Initialized git repository
    echo   2. Added remote origin
    echo   3. Have internet connection
    pause
    exit /b 1
)
echo [OK] Pushed to GitHub!
echo.

echo Step 4: Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed!
    echo.
    echo Make sure you have gh-pages installed:
    echo   npm install --save-dev gh-pages
    pause
    exit /b 1
)
echo.

echo ========================================
echo SUCCESS! Deployment Complete!
echo ========================================
echo.
echo Your app will be live in 2-3 minutes at:
echo https://munsifkhanafg.github.io/service-booking-app/
echo.
echo What was fixed:
echo  - services.json path now works with GitHub Pages
echo  - vite.config.js base path corrected
echo  - All fetch calls updated
echo.
pause
