from django.core.management.base import BaseCommand
from parking.models import ParkingSpot, ParkingSession
from users.models import User
from django.utils import timezone
from datetime import timedelta
import random

class Command(BaseCommand):
    help = 'Generate 200 realistic parking sessions'

    def handle(self, *args, **kwargs):
        ParkingSession.objects.all().delete()
        
        user, _ = User.objects.get_or_create(
            username='demo_user',
            defaults={'email': 'demo@citysense.com'}
        )
        
        spots = list(ParkingSpot.objects.all())
        if not spots:
            self.stdout.write(self.style.ERROR('No parking spots found. Run generate_spots first.'))
            return
        
        sessions = []
        now = timezone.now()
        
        for i in range(200):
            spot = random.choice(spots)
            
            is_active = random.random() < 0.3
            
            if is_active:
                start_time = now - timedelta(minutes=random.randint(10, 180))
                end_time = None
                duration = None
            else:
                start_time = now - timedelta(days=random.randint(0, 7), hours=random.randint(0, 23))
                duration = random.randint(15, 240)
                end_time = start_time + timedelta(minutes=duration)
            
            payment_status = random.choice(['paid', 'paid', 'paid', 'unpaid'])
            parking_status = random.choice(['correct', 'correct', 'correct', 'correct', 'incorrect'])
            
            session = ParkingSession(
                user=user,
                parking_spot=spot,
                start_time=start_time,
                end_time=end_time,
                duration=duration,
                payment_status=payment_status,
                parking_status=parking_status
            )
            sessions.append(session)
        
        ParkingSession.objects.bulk_create(sessions)
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(sessions)} parking sessions'))
