from django.core.management.base import BaseCommand
from parking.models import ParkingSpot
from sensors.models import Sensor
import random

class Command(BaseCommand):
    help = 'Generate 15 well-spread parking spots around University of Zimbabwe campus'

    def handle(self, *args, **kwargs):
        ParkingSpot.objects.all().delete()
        
        base_lat = -17.7840
        base_lon = 31.0535
        
        # 15 specific parking locations spread across campus
        parking_locations = [
            {'zone': 'UZ Main Gate', 'lat': base_lat + 0.0000, 'lon': base_lon + 0.0000, 'road': 'Main Gate Road'},
            {'zone': 'UZ Main Gate', 'lat': base_lat + 0.0002, 'lon': base_lon + 0.0003, 'road': 'Main Gate Road'},
            {'zone': 'UZ Main Gate', 'lat': base_lat - 0.0002, 'lon': base_lon - 0.0002, 'road': 'Entrance Drive'},
            
            {'zone': 'UZ Library', 'lat': base_lat - 0.0010, 'lon': base_lon + 0.0008, 'road': 'Library Parking'},
            {'zone': 'UZ Library', 'lat': base_lat - 0.0012, 'lon': base_lon + 0.0010, 'road': 'Academic Way'},
            {'zone': 'UZ Library', 'lat': base_lat - 0.0008, 'lon': base_lon + 0.0006, 'road': 'Library Parking'},
            
            {'zone': 'UZ Engineering', 'lat': base_lat + 0.0012, 'lon': base_lon - 0.0010, 'road': 'Engineering Block'},
            {'zone': 'UZ Engineering', 'lat': base_lat + 0.0014, 'lon': base_lon - 0.0008, 'road': 'Faculty Road'},
            {'zone': 'UZ Engineering', 'lat': base_lat + 0.0010, 'lon': base_lon - 0.0012, 'road': 'Engineering Block'},
            
            {'zone': 'UZ Administration', 'lat': base_lat - 0.0008, 'lon': base_lon - 0.0012, 'road': 'Admin Block'},
            {'zone': 'UZ Administration', 'lat': base_lat - 0.0010, 'lon': base_lon - 0.0010, 'road': 'Central Avenue'},
            {'zone': 'UZ Administration', 'lat': base_lat - 0.0006, 'lon': base_lon - 0.0014, 'road': 'Admin Block'},
            
            {'zone': 'UZ Sports Complex', 'lat': base_lat + 0.0015, 'lon': base_lon + 0.0015, 'road': 'Sports Ground'},
            {'zone': 'UZ Sports Complex', 'lat': base_lat + 0.0017, 'lon': base_lon + 0.0013, 'road': 'Stadium Road'},
            {'zone': 'UZ Sports Complex', 'lat': base_lat + 0.0013, 'lon': base_lon + 0.0017, 'road': 'Sports Ground'},
        ]
        
        spots = []
        for i, loc in enumerate(parking_locations, 1):
            spot = ParkingSpot(
                latitude=loc['lat'],
                longitude=loc['lon'],
                status=random.choice(['available', 'available', 'occupied']),
                road_name=loc['road'],
                zone=loc['zone'],
                sensor_id=f'UZ_{i:03d}'
            )
            spots.append(spot)
        
        ParkingSpot.objects.bulk_create(spots)
        
        for spot in ParkingSpot.objects.all():
            Sensor.objects.create(
                parking_spot=spot,
                sensor_status='active',
                battery_level=random.randint(70, 100)
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(spots)} parking spots around UZ campus'))
