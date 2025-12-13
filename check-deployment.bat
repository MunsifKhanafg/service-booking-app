@echo off
echo ========================================
echo Checking Deployment Status
echo ========================================
echo.

echo Your GitHub Pages URL should be:
echo https://munsifkhanafg.github.io/service-booking-app/
echo.

echo Opening in browser...
start https://munsifkhanafg.github.io/service-booking-app/
echo.

echo ========================================
echo IMPORTANT: Wait 5 minutes after deploy!
echo ========================================
echo.
echo GitHub Pages CDN can take up to 5 minutes to update.
echo.
echo If you see old version:
echo 1. Wait 5 minutes
echo 2. Clear browser cache (Ctrl + Shift + Delete)
echo 3. Try Incognito/Private mode (Ctrl + Shift + N)
echo 4. Hard refresh (Ctrl + Shift + R)
echo.

echo ========================================
echo Checking when you last deployed...
echo ========================================
git log --branches=gh-pages --oneline -1
echo.

echo ========================================
echo To redeploy right now:
echo ========================================
echo Run: npm run deploy
echo.
pause
