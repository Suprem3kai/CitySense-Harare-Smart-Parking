from django.db import models

class Analytics(models.Model):
    date = models.DateField(auto_now_add=True)
    total_sessions = models.IntegerField(default=0)
    average_parking_time = models.FloatField(default=0.0)
    occupancy_rate = models.FloatField(default=0.0)
    peak_hours = models.CharField(max_length=100, blank=True)
    
    class Meta:
        verbose_name_plural = 'Analytics'
    
    def __str__(self):
        return f"Analytics {self.date}"
