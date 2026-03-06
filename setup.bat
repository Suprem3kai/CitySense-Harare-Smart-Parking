@echo off
echo ========================================
echo CitySense Smart Parking - Quick Setup
echo ========================================
echo.

echo [1/5] Installing Python dependencies...
cd citysense
pip install -r ..\requirements.txt

echo.
echo [2/5] Running migrations...
python manage.py makemigrations
python manage.py migrate

echo.
echo [3/5] Generating 700 parking spots...
python manage.py generate_spots

echo.
echo [4/5] Creating superuser...
echo Please create an admin account:
python manage.py createsuperuser

echo.
echo [5/5] Setup complete!
echo.
echo To start the backend: cd citysense && python manage.py runserver
echo To start the frontend: cd frontend && npm install && npm run dev
echo.
pause
