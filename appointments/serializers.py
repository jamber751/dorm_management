from rest_framework import serializers
from .models import Appointment
from dorm.models import Room
from dorm.serializers import RoomSerializer

class AppointmentSerializer(serializers.ModelSerializer):
    room = RoomSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'

class BookAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['date', 'timeslot', 'machine']