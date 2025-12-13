@echo off
cls
echo ================================================
echo   SERVICE BOOKING APP - COMPLETE FIX & DEPLOY
echo ================================================
echo.
echo This will fix ALL issues and deploy your app:
echo  - Fix 404 error on GitHub Pages
echo  - Add Router basename
echo  - Deploy 50 services
echo  - Improve CSS styling
echo.
echo Press any key to start...
pause >nul
cls

echo.
echo [1/6] Cleaning old build...
if exist "dist" (
    rmdir /s /q dist
    echo [OK] Old build deleted
) else (
    echo [OK] No old build found
)
echo.

echo [2/6] Building fresh project...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed!
    echo.
    echo Check for errors above and try again.
    pause
    exit /b 1
)
echo [OK] Build successful!
echo.

echo [3/6] Verifying services.json...
if exist "dist\services.json" (
    echo [OK] services.json found in dist folder
    for %%A in (dist\services.json) do echo     Size: %%~zA bytes
) else (
    echo [ERROR] services.json not found!
    pause
    exit /b 1
)
echo.

echo [4/6] Committing changes to GitHub...
git add .
git commit -m "Fix: Add basename to Router, improve CSS, add 50 services"
if %errorlevel% neq 0 (
    echo [WARNING] Nothing new to commit or commit failed
)
echo.

echo [5/6] Pushing to GitHub main branch...
git push origin main
if %errorlevel% neq 0 (
    echo [ERROR] Push to GitHub failed!
    echo.
    echo Make sure:
    echo  1. You have internet connection
    echo  2. GitHub credentials are correct
    echo  3. Remote repository exists
    pause
    exit /b 1
)
echo [OK] Pushed to GitHub successfully!
echo.

echo [6/6] Deploying to GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed!
    echo.
    echo Make sure gh-pages is installed:
    echo   npm install --save-dev gh-pages
    pause
    exit /b 1
)
echo [OK] Deployed to GitHub Pages!
echo.

echo ================================================
echo           DEPLOYMENT COMPLETE!
echo ================================================
echo.
echo Your app is being deployed to:
echo https://munsifkhanafg.github.io/service-booking-app/
echo.
echo IMPORTANT: Wait 3-5 minutes for GitHub Pages to update!
echo.
echo What was fixed:
echo  [OK] Router now has basename="/service-booking-app"
echo  [OK] 50 services added (was 30)
echo  [OK] Improved CSS with animations
echo  [OK] Fixed navbar/footer display issues
echo  [OK] Better styling and hover effects
echo.
echo After 5 minutes:
echo  1. Clear browser cache (Ctrl + Shift + Delete)
echo  2. Open Incognito mode (Ctrl + Shift + N)
echo  3. Visit your site
echo  4. You should see 50 services!
echo.
echo Opening your site in 5 seconds...
timeout /t 5 >nul
start https://munsifkhanafg.github.io/service-booking-app/
echo.
echo ================================================
pause
