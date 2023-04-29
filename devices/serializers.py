from rest_framework import serializers
from .models import Device

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['mac', 'type', 'id', 'confirmed']

class DeviceAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['mac', 'type']