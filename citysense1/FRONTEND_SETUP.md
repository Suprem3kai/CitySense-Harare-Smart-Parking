# CitySense Frontend Setup (citysense1)

## Install Dependencies

```bash
cd citysense1
npm install
```

## Start Development Server

```bash
npm run dev
```

Frontend will run at: http://localhost:5173

## Backend Connection

The frontend is configured to connect to the Django backend at:
- API URL: http://localhost:8000/api

Make sure the backend is running before starting the frontend.

## Features

- Login/Register pages
- Interactive map with 700 parking spots
- Real-time parking availability
- GPS location tracking
- Navigation to parking spots
- Session management
- Analytics dashboard
- Auto-refresh every 2 minutes

## Routes

- `/` - Redirects to login or map
- `/login` - Login page
- `/register` - Register page
- `/map` - Main parking map (requires auth)
- `/dashboard` - Analytics dashboard (requires auth)

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.
