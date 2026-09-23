@echo off
setlocal
cd /d "%~dp0"

echo Iniciando FLX STORE...

where py >nul 2>nul
if %errorlevel%==0 (
  start "FLX LOCAL SERVER" /min cmd /c "py -m http.server 8000"
  timeout /t 2 /nobreak >nul
  start "" "http://localhost:8000/index.html"
  exit /b
)

where python >nul 2>nul
if %errorlevel%==0 (
  start "FLX LOCAL SERVER" /min cmd /c "python -m http.server 8000"
  timeout /t 2 /nobreak >nul
  start "" "http://localhost:8000/index.html"
  exit /b
)

rem Fallback: abre diretamente o arquivo caso Python nao esteja instalado.
start "" "%~dp0index.html"
exit /b
