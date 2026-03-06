# CitySense - Smart Parking Platform

A production-ready smart parking platform for Harare, Zimbabwe.

## Overview

CitySense helps drivers find and navigate to available parking spaces in real-time using an interactive map interface.

## Tech Stack

**Backend:**
- Django 5.0
- Django REST Framework
- JWT Authentication
- SQLite (dev) / PostgreSQL (production)

**Frontend:**
- React 18
- React Leaflet
- OpenStreetMap
- Axios
- Vite

## Features

- 🗺️ Interactive parking map centered on Harare
- 📍 700 simulated parking spots
- 🎯 GPS location tracking
- 🧭 Navigation to parking spots
- ⏱️ Parking session management
- 🔐 User authentication (JWT)
- 📊 Analytics dashboard
- 🔄 Auto-refresh every 2 minutes
- 🎨 Color-coded markers (green/red/blue)

## Quick Start

### Option 1: Automated Setup (Windows)
```bash
setup.bat
```

### Option 2: Manual Setup

**Backend:**
```bash
cd citysense
pip install -r ../requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py generate_spots
python manage.py createsuperuser
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

## Project Structure

```
CitySense-Harare-Smart-Parking/
├── citysense/              # Django backend
│   ├── users/              # User authentication
│   ├── parking/            # Parking spots & sessions
│   ├── sensors/            # IoT sensor simulation
│   └── analytics/          # Dashboard analytics
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Helper functions
└── requirements.txt        # Python dependencies
```

## API Documentation

See SETUP.md for complete API endpoint documentation.

## Future Enhancements

- Real IoT sensor integration
- Mobile payment integration (EcoCash, OneMoney)
- Mobile app (React Native)
- Real-time WebSocket updates
- Parking reservations
- Multi-language support

## License

MIT
