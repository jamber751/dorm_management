# Generated by Django 4.1.7 on 2023-04-22 17:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dorm', '0004_alter_room_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='room', to=settings.AUTH_USER_MODEL),
        ),
    ]
