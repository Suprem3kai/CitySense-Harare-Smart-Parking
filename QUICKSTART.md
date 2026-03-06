# CitySense - Quick Start Guide

## Step 1: Backend Setup (5 minutes)

Open terminal in project root:

```bash
cd citysense
pip install -r ../requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py generate_spots
python manage.py createsuperuser
```

Create admin account when prompted.

Start backend:
```bash
python manage.py runserver
```

Keep this terminal open.

## Step 2: Frontend Setup (3 minutes)

Open NEW terminal in project root:

```bash
cd frontend
npm install
npm run dev
```

## Step 3: Access Application

Open browser: http://localhost:3000

1. Click "Register" 
2. Create account (username, email, password)
3. View map with 700 parking spots
4. Click green markers to navigate
5. Start/end parking sessions

## Admin Panel

http://localhost:8000/admin

Login with superuser credentials.

## Troubleshooting

**Backend won't start:**
- Ensure Python 3.10+ installed
- Run: `pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers`

**Frontend won't start:**
- Ensure Node.js 18+ installed
- Delete node_modules and run `npm install` again

**Map not showing:**
- Check browser console for errors
- Ensure backend is running on port 8000
- Clear browser cache

**No parking spots:**
- Run: `python manage.py generate_spots`

## Default Credentials

After running generate_spots, you can create test users via register page.

## Next Steps

- Explore the map
- Start parking sessions
- View dashboard at /dashboard
- Check admin panel for data management
