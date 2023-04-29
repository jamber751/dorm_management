from django.contrib import admin
from .models import Room
from appointments.models import Appointment
from devices.models import Device

# Register your models here.
admin.site.register(Room)
admin.site.register(Appointment)
admin.site.register(Device)