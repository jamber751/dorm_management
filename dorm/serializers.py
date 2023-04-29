from rest_framework import serializers
from .models import Room
from django.contrib.auth.models import User


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'number', 'floor']

class UserSerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    class Meta:
        model = User
        fields = ['username', 'room']
