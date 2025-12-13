@echo off
echo ========================================
echo FORCE REDEPLOY - Fresh Deployment
echo ========================================
echo.

echo Step 1: Cleaning old build...
if exist "dist" (
    rmdir /s /q dist
    echo [OK] Old build deleted
) else (
    echo [OK] No old build found
)
echo.

echo Step 2: Building fresh...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Fresh build created
echo.

echo Step 3: Checking services.json...
if exist "dist\services.json" (
    echo [OK] services.json is in dist folder
) else (
    echo [ERROR] services.json not found in dist!
    pause
    exit /b 1
)
echo.

echo Step 4: Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed!
    pause
    exit /b 1
)
echo [OK] Deployed successfully!
echo.

echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo IMPORTANT: GitHub Pages takes 2-5 minutes to update!
echo.
echo Your site: https://munsifkhanafg.github.io/service-booking-app/
echo.
echo If services don't show immediately:
echo 1. WAIT 5 MINUTES (CDN cache)
echo 2. Clear browser cache (Ctrl + Shift + Delete)
echo 3. Try Incognito mode (Ctrl + Shift + N)
echo 4. Hard refresh (Ctrl + Shift + R)
echo.
echo Opening your site now...
timeout /t 3 >nul
start https://munsifkhanafg.github.io/service-booking-app/
echo.
pause
