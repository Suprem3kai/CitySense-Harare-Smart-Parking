from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from .models import ParkingSession, ParkingSpot
from .serializers import ParkingSessionSerializer

@api_view(['POST'])
def start_session(request):
    spot_id = request.data.get('parking_spot')
    try:
        spot = ParkingSpot.objects.get(pk=spot_id)
        if spot.status == 'occupied':
            return Response({'error': 'Parking spot is occupied'}, status=status.HTTP_400_BAD_REQUEST)
        
        session = ParkingSession.objects.create(
            user_id=1,
            parking_spot=spot
        )
        spot.status = 'occupied'
        spot.save()
        
        serializer = ParkingSessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ParkingSpot.DoesNotExist:
        return Response({'error': 'Parking spot not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def end_session(request):
    session_id = request.data.get('session_id')
    try:
        session = ParkingSession.objects.get(pk=session_id, end_time__isnull=True)
        session.end_time = timezone.now()
        session.duration = int((session.end_time - session.start_time).total_seconds() / 60)
        session.save()
        
        spot = session.parking_spot
        spot.status = 'available'
        spot.save()
        
        serializer = ParkingSessionSerializer(session)
        return Response(serializer.data)
    except ParkingSession.DoesNotExist:
        return Response({'error': 'Active session not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_user_sessions(request):
    sessions = ParkingSession.objects.all().order_by('-start_time')
    serializer = ParkingSessionSerializer(sessions, many=True)
    return Response(serializer.data)
