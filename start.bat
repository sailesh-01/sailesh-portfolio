@echo off
echo ====================================================
echo      Starting Local Portfolio Server
echo ====================================================
echo.

:: Try opening with npx serve
echo Trying to start via npx serve...
npx serve -l 8080
if %errorlevel% equ 0 goto end

:: If npx serve fails, try python
echo.
echo [!] npx serve failed or not found. Trying Python http.server...
python -m http.server 8080
if %errorlevel% equ 0 goto end

:: If both fail, fallback to opening the file directly
echo.
echo [!] Both servers failed. Opening index.html directly in your default browser...
start index.html

:end
pause
