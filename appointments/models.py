from django.db import models
from dorm.models import Room

class Appointment(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateField()
    timeslot = models.PositiveIntegerField()
    machine = models.PositiveIntegerField()
