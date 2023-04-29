from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import date

from .serializers import AppointmentSerializer, BookAppointmentSerializer
from .models import Appointment
from dorm.models import Room

@api_view(['POST'])
def appt_get(request):
    try:
        date = request.data['date']
    except KeyError:
        return Response({'error': 'Missing date in the request'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        appts = Appointment.objects.filter(date=date)
        appts = AppointmentSerializer(appts, many=True).data

        for appt in appts:
            appt['room'] = appt['room']['number']
        return Response(appts)
    except:
        return Response({'error': 'something went wrong while getting the data'}, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['GET'])
def appt_my(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        room = Room.objects.get(user=user)
    except Room.DoesNotExist:
        return Response({'error': 'You are not a resident'}, status=status.HTTP_403_FORBIDDEN)
    
    today = date.today()
    appts = Appointment.objects.filter(room=room, date__gte=today)
    appts = AppointmentSerializer(appts, many=True).data

    for appt in appts:
            appt['room'] = appt['room']['number']
    return Response(appts)


@api_view(['POST'])
def appt_book(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        room = Room.objects.get(user=user)
    except Room.DoesNotExist:
        return Response({'error': 'You are not a resident'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = BookAppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer = serializer.data

        appts = Appointment.objects.filter(room=room, date=serializer['date']).count()
        if appts > 1:
            return Response({'error': 'Max 2 appointments a day allowed'}, status=status.HTTP_400_BAD_REQUEST)

        if Appointment.objects.filter(date=serializer['date'], timeslot=serializer['timeslot'], machine=serializer['machine']).exists():
            return Response({'error': 'Appointment is already booked'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            machine = int(serializer['machine'])
            timeslot = int(serializer['timeslot'])
        except:
            return Response({'error': 'Invalid request data1'}, status=status.HTTP_400_BAD_REQUEST)

        if machine not in [0, 1] or timeslot not in range(12):
            return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
        
        appt = Appointment(room=room, date=serializer['date'], timeslot=serializer['timeslot'], machine=serializer['machine'])
        appt.save()
        return Response(AppointmentSerializer(appt).data)
    else:
        print(serializer.errors)
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def appt_cancel(request):
    user = request.user
    if not user.is_authenticated:
        return Response({'error': 'Not logged in'}, status=status.HTTP_400_BAD_REQUEST)
    # Get the room of the user
    try:
        room = Room.objects.get(user=user)
    except Room.DoesNotExist:
        return Response({'error': 'You are not a resident'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        id = request.data['id']
    except KeyError:
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        appt = Appointment.objects.get(room=room, id=id)
    except Appointment.DoesNotExist:
        return Response({'error': 'Appointment does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    
    appt.delete()
    return Response({'message':'Appointment succesfully cancelled'}, status=status.HTTP_200_OK)