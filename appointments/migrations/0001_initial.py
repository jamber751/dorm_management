# Generated by Django 4.1.7 on 2023-04-24 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('dorm', '0006_remove_device_user_delete_appointment_delete_device'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('timeslot', models.PositiveIntegerField()),
                ('machine', models.PositiveIntegerField()),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='appointments', to='dorm.room')),
            ],
        ),
    ]