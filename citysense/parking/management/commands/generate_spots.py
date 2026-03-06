from django.core.management.base import BaseCommand
from parking.models import ParkingSpot
from sensors.models import Sensor
import random

class Command(BaseCommand):
    help = 'Generate 700 parking spots around Harare'

    def handle(self, *args, **kwargs):
        ParkingSpot.objects.all().delete()
        
        center_lat = -17.8292
        center_lon = 31.0522
        
        roads = [
            'Samora Machel Avenue', 'Julius Nyerere Way', 'Robert Mugabe Road',
            'Nelson Mandela Avenue', 'Kwame Nkrumah Avenue', 'Leopold Takawira Street',
            'Jason Moyo Avenue', 'George Silundika Avenue', 'Angwa Street',
            'First Street', 'Second Street', 'Third Street', 'Fourth Street',
            'Baker Avenue', 'Fife Avenue', 'Mazowe Street', 'Speke Avenue'
        ]
        
        zones = ['CBD', 'Avondale', 'Belgravia', 'Eastlea', 'Newlands']
        
        spots = []
        for i in range(700):
            lat_offset = random.uniform(-0.02, 0.02)
            lon_offset = random.uniform(-0.02, 0.02)
            
            spot = ParkingSpot(
                latitude=center_lat + lat_offset,
                longitude=center_lon + lon_offset,
                status=random.choice(['available', 'occupied']),
                road_name=random.choice(roads),
                zone=random.choice(zones),
                sensor_id=f'SENSOR_{i+1:04d}'
            )
            spots.append(spot)
        
        ParkingSpot.objects.bulk_create(spots)
        
        for spot in ParkingSpot.objects.all():
            Sensor.objects.create(
                parking_spot=spot,
                sensor_status='active',
                battery_level=random.randint(70, 100)
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created 700 parking spots'))
