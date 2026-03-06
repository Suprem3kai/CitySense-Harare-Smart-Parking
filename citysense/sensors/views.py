from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Sensor
from .serializers import SensorSerializer

@api_view(['GET'])
def get_sensors(request):
    sensors = Sensor.objects.all()
    serializer = SensorSerializer(sensors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def update_sensor(request):
    sensor_id = request.data.get('sensor_id')
    try:
        sensor = Sensor.objects.get(parking_spot__sensor_id=sensor_id)
        sensor.sensor_status = request.data.get('sensor_status', sensor.sensor_status)
        sensor.battery_level = request.data.get('battery_level', sensor.battery_level)
        sensor.save()
        serializer = SensorSerializer(sensor)
        return Response(serializer.data)
    except Sensor.DoesNotExist:
        return Response({'error': 'Sensor not found'}, status=status.HTTP_404_NOT_FOUND)
