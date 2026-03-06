from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import ParkingSpot, ParkingSession
from .serializers import ParkingSpotSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_parking_spots(request):
    spots = ParkingSpot.objects.all()
    spots_data = []
    
    for spot in spots:
        active_session = ParkingSession.objects.filter(
            parking_spot=spot,
            end_time__isnull=True
        ).first()
        
        spot_data = {
            'id': spot.id,
            'latitude': spot.latitude,
            'longitude': spot.longitude,
            'status': spot.status,
            'road_name': spot.road_name,
            'zone': spot.zone,
            'sensor_id': spot.sensor_id,
            'payment_status': active_session.payment_status if active_session else None,
            'parking_status': active_session.parking_status if active_session else None,
        }
        spots_data.append(spot_data)
    
    return Response(spots_data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_available_spots(request):
    spots = ParkingSpot.objects.filter(status='available')
    serializer = ParkingSpotSerializer(spots, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_parking_spot(request, pk):
    try:
        spot = ParkingSpot.objects.get(pk=pk)
        serializer = ParkingSpotSerializer(spot)
        return Response(serializer.data)
    except ParkingSpot.DoesNotExist:
        return Response({'error': 'Parking spot not found'}, status=status.HTTP_404_NOT_FOUND)
