from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import DeviceSerializer, DeviceAddSerializer
from .models import Device


@api_view(['GET'])
def device_get(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    devices = Device.objects.filter(user=user)
    return Response(DeviceSerializer(devices, many=True).data, status=status.HTTP_200_OK)


@api_view(['POST'])
def device_register(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = DeviceAddSerializer(data=request.data)
    if serializer.is_valid():
        serializer = serializer.data

        if not len(serializer['mac']) == 17:
            return Response({'error': 'Invalid MAC address'}, status=status.HTTP_400_BAD_REQUEST)
        mac_address = serializer['mac'].split(':')
        if not len(mac_address) == 6:
            return Response({'error': 'Invalid MAC address'}, status=status.HTTP_400_BAD_REQUEST)
        for part in mac_address:
            if len(part) != 2 or not part.isalnum():
                return Response({'error': 'Invalid MAC address'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            device = Device.objects.get(mac=serializer['mac'].lower())
            return Response({'error': 'The MAC Address is already registered'}, status=status.HTTP_400_BAD_REQUEST)
        except Device.DoesNotExist:
            pass
        
        device = Device(
            user=user, mac=serializer['mac'].lower(), type=serializer['type'])
        device.save()
        return Response(DeviceSerializer(device).data)
    else:
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def device_delete(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        id = request.data['id']
    except KeyError:
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        device = Device.objects.get(user=user, id=id)
        device.delete()
    except Device.DoesNotExist:
        return Response({'error': 'Device does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'message': 'Device deleted sucessfully '}, status=status.HTTP_200_OK)
