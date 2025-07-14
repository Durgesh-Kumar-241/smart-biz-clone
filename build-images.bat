@echo off
echo ===== Building Maven project =====
call mvnw clean package -DskipTests

echo.
echo ===== Building Docker images =====

:: Define module and port pairs
call :build_image eureka-discovery-service 8761
call :build_image api-gateway-service 80
call :build_image auth-service 8081
call :build_image user-service 8082
call :build_image product-service 8083




echo.
echo All Docker images built successfully!
goto :eof

:build_image
echo.
echo 🔧 Building %1 on port %2 ...
docker build -t %1:latest --build-arg MODULE_NAME=%1 --build-arg EXPOSE_PORT=%2 .
docker tag %1 kdurgesh029/%1:latest
:: docker push kdurgesh029/%1:latest
if %errorlevel% neq 0 (
    echo Failed to build Docker image for %1
    exit /b %errorlevel%
)
goto :eof
