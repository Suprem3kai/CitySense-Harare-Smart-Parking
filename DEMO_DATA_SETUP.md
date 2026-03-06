# CitySense - Demo Data Setup

## Generate Realistic Demo Data

After setting up the backend, run these commands to populate the database with realistic demo data:

### Step 1: Generate Parking Spots
```bash
cd citysense
python manage.py generate_spots
```

This creates 700 parking spots distributed across major roads in Harare CBD:
- Samora Machel Avenue
- Julius Nyerere Way
- Robert Mugabe Road
- Nelson Mandela Avenue
- And 10+ more roads

### Step 2: Generate Parking Sessions
```bash
python manage.py generate_sessions
```

This creates 200 realistic parking sessions with:
- 30% active sessions
- 70% completed sessions
- Random payment status (paid/unpaid)
- Random parking status (correct/incorrect)

### Step 3: Apply Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

This applies the new `parking_status` field to the ParkingSession model.

### Step 4: Start Backend
```bash
python manage.py runserver
```

### Step 5: Start Frontend
```bash
cd ../citysense1
npm install
npm run dev
```

## What You'll See

### Map Features
- **700 parking spots** along real Harare roads
- **Color-coded markers:**
  - Green = Available
  - Red = Occupied
  - Yellow border = Unpaid parking
  - Orange border = Incorrect parking
  - Blue = Your location

### Dashboard Stats (Auto-refreshes every 2 minutes)
- Total parking spots
- Available spots
- Occupied spots
- Active sessions
- Unpaid sessions
- Incorrect parking cases

### Interactive Features
- Click markers to see detailed info
- Navigate to available spots
- Start/end parking sessions
- View distance calculations
- See route visualization

## Zones
Parking spots are distributed across 3 zones:
- CBD-A
- CBD-B
- CBD-C

## Demo User
A demo user is automatically created:
- Username: demo_user
- Email: demo@citysense.com

## Regenerate Data
To regenerate fresh demo data:
```bash
python manage.py generate_spots
python manage.py generate_sessions
```

This will delete existing data and create new realistic demo data.
