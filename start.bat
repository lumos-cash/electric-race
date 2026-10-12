@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 server.py
  if not errorlevel 1 exit /b 0
)
where python >nul 2>nul
if not errorlevel 1 (
  python server.py
  if not errorlevel 1 exit /b 0
)
echo Python 3 not found. Opening the self-contained offline page instead.
start "" "%~dp0index.html"
exit /b 0
