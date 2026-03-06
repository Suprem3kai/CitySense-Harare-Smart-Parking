# CitySense - Complete Run Guide

## ✅ Project Structure

```
CitySense-Harare-Smart-Parking/
├── citysense/          # Django Backend
└── citysense1/         # React Frontend (TypeScript)
```

## 🚀 Step-by-Step Setup

### Step 1: Backend Setup (Django)

Open Terminal 1:

```bash
cd citysense
pip install -r ../requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py generate_spots
python manage.py createsuperuser
```

Create admin credentials when prompted.

Start backend:
```bash
python manage.py runserver
```

Backend runs at: **http://localhost:8000**

### Step 2: Frontend Setup (React + TypeScript)

Open Terminal 2:

```bash
cd citysense1
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

## 🌐 Access the Application

1. Open browser: **http://localhost:5173**
2. Click "Register" to create account
3. Login with credentials
4. View interactive map with 700 parking spots
5. Click green markers (available spots)
6. Start/end parking sessions

## 📊 Admin Panel

Access: **http://localhost:8000/admin**

Login with superuser credentials created in Step 1.

## 🔗 API Endpoints

Base URL: **http://localhost:8000/api**

### Authentication
- POST `/auth/register` - Register user
- POST `/auth/login` - Login user

### Parking
- GET `/parking/spots` - All spots
- GET `/parking/spots/available` - Available spots
- GET `/parking/spots/{id}` - Specific spot

### Sessions
- POST `/sessions/start` - Start parking
- POST `/sessions/end` - End parking
- GET `/sessions/user` - User sessions

### Analytics
- GET `/analytics/dashboard` - Dashboard data

## ✨ Features

✅ 700 parking spots around Harare (Joina City)
✅ Interactive OpenStreetMap
✅ Color-coded markers (green=available, red=occupied, blue=user)
✅ GPS location tracking
✅ Distance calculation
✅ Route visualization
✅ Session management
✅ Auto-refresh every 2 minutes
✅ JWT authentication
✅ Analytics dashboard

## 🛠️ Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
python manage.py runserver 8001
```
Update API_URL in `citysense1/src/services/api.ts`

**No parking spots:**
```bash
python manage.py generate_spots
```

### Frontend Issues

**Port 5173 already in use:**
Edit `citysense1/vite.config.ts` and change port

**CORS errors:**
Ensure `django-cors-headers` is installed and configured

**Map not loading:**
Check browser console and ensure leaflet CSS is loaded

### Connection Issues

**Frontend can't connect to backend:**
1. Verify backend is running on port 8000
2. Check API_URL in `citysense1/src/services/api.ts`
3. Ensure CORS is enabled in Django settings

## 📝 Test Workflow

1. Register new user
2. Login
3. View map with parking spots
4. Click on green marker
5. Click "Navigate Here"
6. Click "Start Parking"
7. Session becomes active
8. Click "End Parking"
9. View session in dashboard

## 🔐 Default Setup

- Database: SQLite (dev)
- Backend Port: 8000
- Frontend Port: 5173
- Auth: JWT tokens
- Map Center: Harare, Zimbabwe (-17.8292, 31.0522)

## 📦 Dependencies

### Backend
- Django 5.0
- djangorestframework
- djangorestframework-simplejwt
- django-cors-headers

### Frontend
- React 19
- TypeScript
- React Router
- React Leaflet
- Leaflet
- Axios

## 🎯 Next Steps

After successful setup:
1. Explore the map interface
2. Test parking sessions
3. View analytics dashboard
4. Access admin panel for data management
5. Customize for production deployment

## 📚 Documentation

- README.md - Project overview
- SETUP.md - Detailed setup
- DOCUMENTATION.md - Complete docs
- citysense1/FRONTEND_SETUP.md - Frontend specific

---

**Ready to use! 🎉**
