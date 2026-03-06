# CitySense Smart Parking Platform - Complete Documentation

## Project Overview

CitySense is a production-ready smart parking MVP for Harare, Zimbabwe. The platform enables drivers to find, navigate to, and manage parking sessions through an interactive map interface.

## Architecture

### Backend (Django)
- **Framework:** Django 5.0 + Django REST Framework
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Database:** SQLite (dev), PostgreSQL-ready (production)
- **CORS:** django-cors-headers

### Frontend (React)
- **Framework:** React 18
- **Build Tool:** Vite
- **Mapping:** React Leaflet + OpenStreetMap
- **HTTP Client:** Axios
- **Routing:** React Router v6

## Database Models

### User (users app)
- username, email, password
- role: driver/attendant/admin

### ParkingSpot (parking app)
- latitude, longitude
- status: available/occupied
- road_name, zone, sensor_id

### ParkingSession (parking app)
- user, parking_spot
- start_time, end_time, duration
- payment_status: pending/paid/failed

### Sensor (sensors app)
- parking_spot (OneToOne)
- sensor_status: active/inactive/maintenance
- last_ping, battery_level

### Analytics (analytics app)
- date, total_sessions
- average_parking_time
- occupancy_rate, peak_hours

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Parking Spots
```
GET  /api/parking/spots
GET  /api/parking/spots/available
GET  /api/parking/spots/{id}
```

### Sessions
```
POST /api/sessions/start
POST /api/sessions/end
GET  /api/sessions/user
```

### Sensors
```
GET  /api/sensors
POST /api/sensors/update
```

### Analytics
```
GET  /api/analytics/dashboard
```

## Frontend Components

### Pages
- **Login.jsx** - User authentication
- **Register.jsx** - User registration
- **MapView.jsx** - Main parking map interface
- **Dashboard.jsx** - Analytics and session history

### Components
- **ParkingMarker.jsx** - Map markers for parking spots

### Services
- **api.js** - Axios API client with JWT interceptor

### Utils
- **helpers.js** - Geolocation, distance calculation, formatting

## Key Features

1. **Interactive Map**
   - OpenStreetMap tiles
   - 700 parking spots around Harare
   - Color-coded markers (green/red/blue)
   - User location tracking

2. **Navigation**
   - Click-to-navigate functionality
   - Distance calculation
   - Route visualization

3. **Session Management**
   - Start parking session
   - End parking session
   - Session history

4. **Real-time Updates**
   - Auto-refresh every 2 minutes
   - Live availability status

5. **Analytics Dashboard**
   - Total/available/occupied spots
   - Occupancy rate
   - Session statistics

## File Structure

```
CitySense-Harare-Smart-Parking/
├── citysense/                          # Django Backend
│   ├── citysense/                      # Project settings
│   │   ├── settings.py                 # Django configuration
│   │   ├── urls.py                     # Main URL routing
│   │   ├── wsgi.py                     # WSGI config
│   │   └── asgi.py                     # ASGI config
│   ├── users/                          # User management
│   │   ├── models.py                   # User model
│   │   ├── serializers.py              # User serializers
│   │   ├── views.py                    # Auth views
│   │   ├── urls.py                     # Auth routes
│   │   └── admin.py                    # Admin config
│   ├── parking/                        # Parking management
│   │   ├── models.py                   # ParkingSpot, ParkingSession
│   │   ├── serializers.py              # Parking serializers
│   │   ├── views.py                    # Parking views
│   │   ├── session_views.py            # Session views
│   │   ├── urls.py                     # Parking routes
│   │   ├── session_urls.py             # Session routes
│   │   ├── admin.py                    # Admin config
│   │   └── management/commands/
│   │       └── generate_spots.py       # Generate 700 spots
│   ├── sensors/                        # Sensor management
│   │   ├── models.py                   # Sensor model
│   │   ├── serializers.py              # Sensor serializers
│   │   ├── views.py                    # Sensor views
│   │   └── urls.py                     # Sensor routes
│   ├── analytics/                      # Analytics
│   │   ├── models.py                   # Analytics model
│   │   ├── serializers.py              # Analytics serializers
│   │   ├── views.py                    # Analytics views
│   │   └── urls.py                     # Analytics routes
│   └── manage.py                       # Django CLI
├── frontend/                           # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ParkingMarker.jsx       # Map marker component
│   │   ├── pages/
│   │   │   ├── Login.jsx               # Login page
│   │   │   ├── Register.jsx            # Registration page
│   │   │   ├── MapView.jsx             # Main map page
│   │   │   └── Dashboard.jsx           # Analytics dashboard
│   │   ├── services/
│   │   │   └── api.js                  # API client
│   │   ├── utils/
│   │   │   └── helpers.js              # Helper functions
│   │   ├── App.jsx                     # Main app component
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── index.html                      # HTML template
│   ├── package.json                    # Dependencies
│   └── vite.config.js                  # Vite config
├── requirements.txt                    # Python dependencies
├── README.md                           # Project overview
├── SETUP.md                            # Setup instructions
├── QUICKSTART.md                       # Quick start guide
├── setup.bat                           # Windows setup script
└── .gitignore                          # Git ignore rules
```

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- pip, npm

### Backend Setup
```bash
cd citysense
pip install -r ../requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py generate_spots
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Configuration

### Django Settings (citysense/settings.py)
- SECRET_KEY: Change in production
- DEBUG: Set to False in production
- ALLOWED_HOSTS: Configure for production
- DATABASES: Switch to PostgreSQL for production
- CORS_ALLOW_ALL_ORIGINS: Restrict in production

### API Base URL (frontend/src/services/api.js)
- Development: http://localhost:8000/api
- Production: Update to production URL

## Deployment Considerations

### Backend
1. Use PostgreSQL database
2. Set environment variables for secrets
3. Configure static file serving
4. Use gunicorn/uwsgi for WSGI
5. Set up SSL/HTTPS
6. Configure CORS properly

### Frontend
1. Build production bundle: `npm run build`
2. Serve static files via nginx/Apache
3. Update API_URL to production backend
4. Enable HTTPS

### Database Migration to PostgreSQL
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'citysense_db',
        'USER': 'citysense_user',
        'PASSWORD': 'secure_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Testing

### Backend
```bash
python manage.py test
```

### Frontend
```bash
npm test
```

## Future Enhancements

1. **IoT Integration**
   - Real sensor hardware integration
   - MQTT protocol support
   - Real-time sensor data streaming

2. **Payment Integration**
   - EcoCash API integration
   - OneMoney payment gateway
   - Payment history and receipts

3. **Mobile App**
   - React Native mobile app
   - Push notifications
   - Offline mode support

4. **Advanced Features**
   - Parking reservations
   - QR code parking tickets
   - Multi-language support (English, Shona, Ndebele)
   - Voice navigation
   - Parking history analytics
   - Dynamic pricing

5. **Infrastructure**
   - WebSocket for real-time updates
   - Redis caching
   - Celery for background tasks
   - Docker containerization
   - CI/CD pipeline

## Security Best Practices

1. Change SECRET_KEY in production
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Implement rate limiting
5. Add input validation
6. Use secure password hashing (Django default)
7. Implement CSRF protection (Django default)
8. Configure proper CORS settings

## Performance Optimization

1. Database indexing on frequently queried fields
2. API response caching
3. Frontend code splitting
4. Image optimization
5. CDN for static assets
6. Database query optimization
7. Pagination for large datasets

## Support

For issues or questions, refer to:
- README.md - Project overview
- SETUP.md - Detailed setup guide
- QUICKSTART.md - Quick start instructions

## License

MIT License - Free to use and modify
