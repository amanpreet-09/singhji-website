@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

rem Ensure Docker Desktop is running. If it is not, start it.
for /f "skip=1 tokens=1" %%P in ('wmic process get name 2^>nul ^| findstr /I "Docker Desktop.exe"') do set DOCKER_RUNNING=1
if not defined DOCKER_RUNNING (
    echo Starting Docker Desktop...
    start "Docker Desktop" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
)

rem Wait until Docker engine is ready.
echo Waiting for Docker to become ready...
:wait_docker
docker info >nul 2>&1
if errorlevel 1 (
    timeout /t 5 /nobreak >nul
    goto wait_docker
)

echo Docker is ready.

docker compose up -d

echo Waiting for singhji-website to become healthy...
:wait_container
for /f "delims=" %%i in ('docker inspect --format "{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}" singhji-website 2^>nul') do set CONTAINER_STATUS=%%i
if /I "!CONTAINER_STATUS!"=="healthy" (
    goto ready
)
if /I "!CONTAINER_STATUS!"=="running" (
    rem Keep checking the HTTP endpoint as a final readiness signal.
    curl -I http://localhost:3001 >nul 2>&1
    if not errorlevel 1 (
        goto ready
    )
)

timeout /t 5 /nobreak >nul
set CONTAINER_STATUS=
goto wait_container

:ready
echo singhji-website is up and healthy.
start http://localhost:3001
exit /b 0
