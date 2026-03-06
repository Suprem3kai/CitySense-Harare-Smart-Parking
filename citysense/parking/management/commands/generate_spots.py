from django.core.management.base import BaseCommand
from parking.models import ParkingSpot
from sensors.models import Sensor
import random

class Command(BaseCommand):
    help = 'Generate 50 realistic parking spots in actual parking areas around Harare CBD'

    def handle(self, *args, **kwargs):
        ParkingSpot.objects.all().delete()
        
        # Actual parking locations in Harare CBD with real coordinates
        parking_areas = [
            # Joina City Parking
            {'name': 'Joina City Parking', 'lat': -17.8295, 'lon': 31.0525, 'spots': 8, 'zone': 'CBD-A'},
            
            # Samora Machel Avenue street parking
            {'name': 'Samora Machel Avenue', 'lat': -17.8252, 'lon': 31.0518, 'spots': 6, 'zone': 'CBD-A'},
            
            # Jason Moyo Avenue street parking
            {'name': 'Jason Moyo Avenue', 'lat': -17.8268, 'lon': 31.0502, 'spots': 5, 'zone': 'CBD-A'},
            
            # First Street parking bays
            {'name': 'First Street', 'lat': -17.8242, 'lon': 31.0508, 'spots': 4, 'zone': 'CBD-B'},
            
            # Second Street parking bays
            {'name': 'Second Street', 'lat': -17.8248, 'lon': 31.0512, 'spots': 4, 'zone': 'CBD-B'},
            
            # Nelson Mandela Avenue parking
            {'name': 'Nelson Mandela Avenue', 'lat': -17.8275, 'lon': 31.0485, 'spots': 5, 'zone': 'CBD-B'},
            
            # Robert Mugabe Road parking
            {'name': 'Robert Mugabe Road', 'lat': -17.8312, 'lon': 31.0542, 'spots': 4, 'zone': 'CBD-C'},
            
            # Julius Nyerere Way parking
            {'name': 'Julius Nyerere Way', 'lat': -17.8282, 'lon': 31.0498, 'spots': 4, 'zone': 'CBD-C'},
            
            # Kwame Nkrumah Avenue parking
            {'name': 'Kwame Nkrumah Avenue', 'lat': -17.8288, 'lon': 31.0515, 'spots': 3, 'zone': 'CBD-A'},
            
            # Baker Avenue parking
            {'name': 'Baker Avenue', 'lat': -17.8298, 'lon': 31.0528, 'spots': 3, 'zone': 'CBD-C'},
            
            # Leopold Takawira Street parking
            {'name': 'Leopold Takawira Street', 'lat': -17.8302, 'lon': 31.0532, 'spots': 4, 'zone': 'CBD-C'},
        ]
        
        spots = []
        sensor_id = 1
        
        for area in parking_areas:
            for i in range(area['spots']):
                # Small offset for parking bay positions (5-10 meters apart)
                lat_offset = random.uniform(-0.0001, 0.0001)  # ~10 meters
                lon_offset = random.uniform(-0.0001, 0.0001)
                
                spot = ParkingSpot(
                    latitude=area['lat'] + lat_offset,
                    longitude=area['lon'] + lon_offset,
                    status=random.choice(['available', 'available', 'available', 'occupied']),
                    road_name=area['name'],
                    zone=area['zone'],
                    sensor_id=f'SENSOR_{sensor_id:04d}'
                )
                spots.append(spot)
                sensor_id += 1
        
        ParkingSpot.objects.bulk_create(spots)
        
        for spot in ParkingSpot.objects.all():
            Sensor.objects.create(
                parking_spot=spot,
                sensor_status='active',
                battery_level=random.randint(70, 100)
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(spots)} parking spots in real parking areas'))
