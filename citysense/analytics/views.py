from rest_framework.decorators import api_view
from rest_framework.response import Response
from parking.models import ParkingSpot, ParkingSession
from django.db.models import Avg, Count
from django.utils import timezone
from datetime import timedelta

@api_view(['GET'])
def get_dashboard(request):
    total_spots = ParkingSpot.objects.count()
    occupied_spots = ParkingSpot.objects.filter(status='occupied').count()
    available_spots = total_spots - occupied_spots
    
    active_sessions = ParkingSession.objects.filter(end_time__isnull=True).count()
    unpaid_sessions = ParkingSession.objects.filter(payment_status='unpaid').count()
    incorrect_parking = ParkingSession.objects.filter(parking_status='incorrect', end_time__isnull=True).count()
    
    today = timezone.now().date()
    sessions_today = ParkingSession.objects.filter(start_time__date=today)
    total_sessions = sessions_today.count()
    
    avg_time = sessions_today.filter(duration__isnull=False).aggregate(Avg('duration'))['duration__avg'] or 0
    occupancy_rate = (occupied_spots / total_spots * 100) if total_spots > 0 else 0
    
    return Response({
        'total_spots': total_spots,
        'available_spots': available_spots,
        'occupied_spots': occupied_spots,
        'active_sessions': active_sessions,
        'unpaid_sessions': unpaid_sessions,
        'incorrect_parking': incorrect_parking,
        'total_sessions_today': total_sessions,
        'average_parking_time': round(avg_time, 2),
        'occupancy_rate': round(occupancy_rate, 2),
    })
