from django.contrib import admin
from .models import ParkingSpot, ParkingSession

@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = ['sensor_id', 'road_name', 'zone', 'status']
    list_filter = ['status', 'zone']

@admin.register(ParkingSession)
class ParkingSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'parking_spot', 'start_time', 'end_time', 'payment_status']
    list_filter = ['payment_status']
