@echo off
title Dev Duck - MongoDB Service Manager
color 0A

:: Kiểm tra quyền admin
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
    echo Yêu cầu quyền quản trị...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

:MENU
cls
echo ===============================================
echo         MONGODB SERVICE MANAGER
echo               by Dev Duck
echo ===============================================
echo.
echo   [1] Start MongoDB
echo   [2] Stop MongoDB
echo   [3] Restart MongoDB
echo   [4] Exit
echo.
set /p choice=>> Chọn chức năng (1-4): 

if "%choice%"=="1" goto START_MONGO
if "%choice%"=="2" goto STOP_MONGO
if "%choice%"=="3" goto RESTART_MONGO
if "%choice%"=="4" goto END
goto MENU

:START_MONGO
echo.
echo [✔] Đang khởi động MongoDB...
net start mongodb
pause
goto MENU

:STOP_MONGO
echo.
echo [✔] Đang dừng MongoDB...
net stop mongodb
pause
goto MENU

:RESTART_MONGO
echo.
echo [✔] Đang khởi động lại MongoDB...
net stop mongodb
net start mongodb
pause
goto MENU

:END
echo.
echo [✓] Cảm ơn bạn đã dùng tool của Dev Duck.
timeout /t 2 >nul
exit
