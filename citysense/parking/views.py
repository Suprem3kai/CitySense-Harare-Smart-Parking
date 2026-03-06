from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import ParkingSpot
from .serializers import ParkingSpotSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def get_parking_spots(request):
    spots = ParkingSpot.objects.all()
    serializer = ParkingSpotSerializer(spots, many=True)
    return Response(serializer.data)

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
