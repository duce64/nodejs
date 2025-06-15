@echo off
title RUNNING NODE.JS SERVER - Dev Duck
color 0A

:: Di chuyển đến thư mục chứa file index.js
cd /d "%~dp0"

echo ========================================
echo   🚀 Đang khởi động Node.js server...
echo ========================================
echo.

:: Chạy index.js bằng Node.js
node index.js

echo.
echo [✓] Server đã dừng. Nhấn phím bất kỳ để thoát...
pause >nul
