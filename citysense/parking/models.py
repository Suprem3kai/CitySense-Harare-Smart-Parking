from django.db import models
from django.conf import settings

class ParkingSpot(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
    ]
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    road_name = models.CharField(max_length=200)
    zone = models.CharField(max_length=100)
    sensor_id = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return f"{self.road_name} - {self.sensor_id}"

class ParkingSession(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('unpaid', 'Unpaid'),
        ('failed', 'Failed'),
    ]
    PARKING_STATUS_CHOICES = [
        ('correct', 'Correct'),
        ('incorrect', 'Incorrect'),
        ('overstayed', 'Overstayed'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parking_spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    parking_status = models.CharField(max_length=20, choices=PARKING_STATUS_CHOICES, default='correct')
    
    def __str__(self):
        return f"{self.user.username} - {self.parking_spot.sensor_id}"
