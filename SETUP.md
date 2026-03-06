# CitySense Smart Parking Platform - Setup Guide

## Prerequisites
- Python 3.10+
- Node.js 18+
- pip and npm

## Backend Setup

### 1. Navigate to backend directory
```bash
cd citysense
```

### 2. Install Python dependencies
```bash
pip install -r ../requirements.txt
```

### 3. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create superuser (admin)
```bash
python manage.py createsuperuser
```

### 5. Generate 700 parking spots
```bash
python manage.py generate_spots
```

### 6. Start Django server
```bash
python manage.py runserver
```

Backend will run at: http://localhost:8000

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

Frontend will run at: http://localhost:3000

## Usage

1. Open browser to http://localhost:3000
2. Register a new account
3. Login with credentials
4. View parking map with 700 spots around Harare
5. Click on green markers (available spots)
6. Start parking session
7. End session when done

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Parking
- GET /api/parking/spots - Get all parking spots
- GET /api/parking/spots/available - Get available spots
- GET /api/parking/spots/{id} - Get specific spot

### Sessions
- POST /api/sessions/start - Start parking session
- POST /api/sessions/end - End parking session
- GET /api/sessions/user - Get user sessions

### Analytics
- GET /api/analytics/dashboard - Get dashboard data

## Features

✅ 700 simulated parking spots around Harare
✅ Real-time parking availability
✅ GPS location tracking
✅ Navigation to parking spots
✅ Parking session management
✅ JWT authentication
✅ Auto-refresh every 2 minutes
✅ Interactive map with OpenStreetMap
✅ Color-coded markers (green=available, red=occupied, blue=user)
✅ Distance calculation
✅ Analytics dashboard

## Admin Panel

Access Django admin at: http://localhost:8000/admin

## Production Deployment

### Database
Switch to PostgreSQL in settings.py:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'citysense_db',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Security
- Change SECRET_KEY in settings.py
- Set DEBUG = False
- Configure ALLOWED_HOSTS
- Use environment variables for sensitive data

## Troubleshooting

### CORS Issues
Ensure django-cors-headers is installed and configured in settings.py

### Map not loading
Check that leaflet CSS is loaded in index.html

### API connection failed
Verify backend is running on port 8000
