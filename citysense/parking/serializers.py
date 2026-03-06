from rest_framework import serializers
from .models import ParkingSpot, ParkingSession

class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = '__all__'

class ParkingSessionSerializer(serializers.ModelSerializer):
    parking_spot_details = ParkingSpotSerializer(source='parking_spot', read_only=True)
    
    class Meta:
        model = ParkingSession
        fields = '__all__'
