@echo off
:: Kiểm tra xem script đã được chạy với quyền admin chưa
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

:: Nếu chưa có quyền admin thì chạy lại với quyền admin
if '%errorlevel%' NEQ '0' (
    echo Đang yêu cầu quyền quản trị...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

:: Nếu đã có quyền admin thì khởi động MongoDB
echo Đang khởi động MongoDB...
net start mongodb

pause
