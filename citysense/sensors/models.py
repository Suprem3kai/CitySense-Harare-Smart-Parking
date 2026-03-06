from django.db import models
from parking.models import ParkingSpot

class Sensor(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('maintenance', 'Maintenance'),
    ]
    parking_spot = models.OneToOneField(ParkingSpot, on_delete=models.CASCADE)
    sensor_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    last_ping = models.DateTimeField(auto_now=True)
    battery_level = models.IntegerField(default=100)
    
    def __str__(self):
        return f"Sensor {self.parking_spot.sensor_id}"
