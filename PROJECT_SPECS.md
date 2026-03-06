CitySense Smart Parking Platform — Project Specification
# CitySense Smart Parking Platform

## Project Overview

CitySense is a smart parking platform designed for urban environments in developing cities.  
The system allows drivers to locate available parking spaces using an interactive map, GPS navigation, and real-time parking availability.

The platform will initially operate as a **Minimum Viable Product (MVP)** with simulated parking data and later integrate **IoT sensors and mobile payment systems**.

Target deployment city: **Harare, Zimbabwe**

---

# Core Problem

Drivers in urban areas spend signdificant time searching for parking spaces.  
This increases:

- fuel consumption
- traffic congestion
- driver frustration
- inefficient use of parking infrastructure

CitySense solves this problem by providing **real-time parking discovery and navigation**.

---

# Technology Stack

Frontend

React  
Leaflet.js (map rendering)  
OpenStreetMap data  
Axios (API communication)

Backend

Django  
Django REST Framework

Database

PostgreSQL (production)  
SQLite (development)

Future integrations

IoT sensors  
Mobile payments (PayNow, EcoCash)  
Municipal analytics dashboard

---

# System Architecture

User Device  
→ React Frontend  
→ Django REST API  
→ Database

Future architecture

IoT Parking Sensors  
→ Sensor Gateway  
→ Django API  
→ Database  
→ Frontend updates

---

# Core Features

## Interactive Map

The platform displays a city map showing parking spaces.

Map details

- Center: Joina City, Harare
- Coordinates: -17.8292, 31.0522
- Uses OpenStreetMap

Parking spaces will be generated along real road networks.

Total parking spaces: **700**

---

## Parking Spot Status

Each parking spot has a status:

Green marker = Available  
Red marker = Occupied

Parking availability updates every **2 minutes**.

---

## User GPS Tracking

The system must detect the user's location using browser geolocation.

The user's position will appear as a **blue marker** on the map.

---

## Navigation to Parking

Drivers can select an available parking spot.

The system must:

- calculate route
- display distance
- estimate travel time
- show navigation path

Use Leaflet routing or OpenRouteService.

---

# Backend Design

The Django backend should be structured using multiple apps.

Apps required:

users  
parking  
sensors  
analytics

---

# User Roles

Driver

- view parking spaces
- navigate to parking
- start parking sessions

Attendant

- monitor parking spots
- manually update parking status

Admin

- manage users
- manage parking zones
- monitor analytics

---

# Database Models

## User

Fields

id  
username  
email  
password  
role (driver, attendant, admin)  
date_joined

---

## ParkingSpot

Represents an individual parking location.

Fields

id  
latitude  
longitude  
status (available / occupied)  
road_name  
zone  
sensor_id (optional)

---

## ParkingSession

Tracks a user's parking activity.

Fields

id  
user  
parking_spot  
start_time  
end_time  
duration  
payment_status

---

## Sensor

Represents IoT parking sensors.

Fields

id  
parking_spot  
sensor_status  
last_ping  
battery_level

---

## Analytics

Used for city insights.

Fields

id  
date  
total_sessions  
average_parking_time  
occupancy_rate  
peak_hours

---

# API Design

Authentication

POST /api/auth/register  
POST /api/auth/login

---

Parking

GET /api/parking/spots  
GET /api/parking/spots/available  
GET /api/parking/spots/{id}

---

Sessions

POST /api/sessions/start  
POST /api/sessions/end  
GET /api/sessions/user

---

Sensors

POST /api/sensors/update  
GET /api/sensors

---

Analytics

GET /api/analytics/dashboard

---

# Frontend Structure

Suggested React folder structure


src/

components/
MapView.js
ParkingMarker.js
NavigationPanel.js
SessionPanel.js

pages/
Dashboard.js
Login.js
Register.js

services/
api.js

utils/
geolocation.js
routing.js


---

# Map Behaviour

When the application loads:

1. Map centers on Joina City
2. Fetch parking spots from backend
3. Render parking markers
4. Detect user GPS location
5. Display user marker
6. Update parking availability every 120 seconds

---

# Development Steps

Step 1

Initialize Django project

Create apps:

users  
parking  
sensors  
analytics

---

Step 2

Create database models

User  
ParkingSpot  
ParkingSession  
Sensor  
Analytics

---

Step 3

Create REST API endpoints

Authentication  
Parking spots  
Sessions

---

Step 4

Initialize React frontend

Install dependencies:

react  
leaflet  
react-leaflet  
axios

---

Step 5

Build map interface

Display map  
Render parking spots  
Add status markers

---

Step 6

Implement GPS tracking

Display user marker  
Calculate distance to parking spots

---

Step 7

Add navigation

Route to selected parking spot

---

Step 8

Implement parking sessions

Start session  
End session  
Track duration

---

# Planned Future Features

## Mobile Payments

Integrate local payment systems

PayNow  
EcoCash  
OneMoney

Drivers pay parking fees via mobile money.

---

## IoT Sensor Integration

Each parking space will include a sensor that detects vehicle presence.

Possible technologies

Ultrasonic sensors  
Magnetic vehicle detection  
ESP32 microcontrollers

Sensors will send data to the backend.

---

## Municipal Dashboard

A web interface for city administrators showing:

Parking occupancy  
Revenue analytics  
Traffic congestion patterns

---

# Project Goal

CitySense aims to build a scalable smart parking system suitable for cities in Africa and other developing regions.

The MVP should demonstrate:

Real-time parking discovery  
Navigation to available parking  
Parking session tracking

The platform should be designed so it can scale to thousands of parking spaces.