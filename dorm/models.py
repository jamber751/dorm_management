from django.db import models
from django.contrib.auth.models import User

class Room(models.Model):
    user = models.OneToOneField(User, on_delete=models.DO_NOTHING, related_name="room", null=True, blank=True)
    number = models.PositiveIntegerField(unique=True)
    floor = models.PositiveIntegerField()
    def __str__(self):
        return str(self.number)