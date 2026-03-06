# CitySense - UZ Campus Improvements

## What's New

### Backend
- **350 parking spots** around University of Zimbabwe campus
- **5 campus zones**: Main Gate, Library, Engineering, Administration, Sports Complex
- **175 parking sessions** with realistic data
- **Overstayed status** added to parking violations
- **Zone distribution** analytics

### Frontend
- **Rich dashboard** with 8 stat cards and icons
- **Analytics charts**: Occupancy, Payment Status, Zone Distribution
- **Enhanced markers** with overstayed (purple border) indicator
- **UZ campus centered** map at -17.7840, 31.0535
- **Auto-refresh** every 120 seconds

## Setup Instructions

### 1. Backend Setup

```bash
cd citysense
..\electronics\Scripts\python.exe manage.py makemigrations
..\electronics\Scripts\python.exe manage.py migrate
..\electronics\Scripts\python.exe manage.py generate_spots
..\electronics\Scripts\python.exe manage.py generate_sessions
..\electronics\Scripts\python.exe manage.py runserver
```

### 2. Frontend Setup

```bash
cd citysense1
npm install
npm run dev
```

Access: **http://localhost:5173**

## Features

### Dashboard Stats
- 🅿️ Total Spots
- ✅ Available
- 🚗 Occupied
- ⏱️ Active Sessions
- 💰 Paid Sessions
- ⚠️ Unpaid Sessions
- 🚫 Incorrect Parking
- ⏰ Overstayed Vehicles

### Analytics Charts
- **Pie Chart**: Parking Occupancy (Available vs Occupied)
- **Pie Chart**: Payment Status (Paid vs Unpaid)
- **Bar Chart**: Zone Distribution across 5 UZ zones

### Map Markers
- **Green** = Available
- **Red** = Occupied
- **Yellow border** = Unpaid
- **Orange border** = Incorrect
- **Purple border** = Overstayed

### UZ Campus Zones
1. UZ Main Gate (80 spots)
2. UZ Library (70 spots)
3. UZ Engineering (60 spots)
4. UZ Administration (70 spots)
5. UZ Sports Complex (70 spots)

## Map Center
- Latitude: -17.7840
- Longitude: 31.0535
- Zoom: 16 (campus view)

## Auto-Refresh
- Dashboard stats: Every 120 seconds
- Parking spots: Every 120 seconds
- Analytics charts: Every 120 seconds

## Technologies Added
- **Recharts** for data visualization
- Enhanced UI with emoji icons
- Responsive grid layouts
- Color-coded stat cards
