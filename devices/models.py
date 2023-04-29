from django.db import models
from django.contrib.auth.models import User

class Device(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="devices")
    mac = models.CharField(max_length=17)
    type = models.CharField(max_length=20)
    confirmed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.mac
