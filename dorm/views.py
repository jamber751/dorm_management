from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Room
from .serializers import UserSerializer


@api_view(['POST'])
def register_view(request):
    # Check request data
    try:
        username = request.data['username']
        password = request.data['password']
        confirmation = request.data['confirmation']
        room_number = request.data['room_number']
    except KeyError:
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    # Check if room number is valid
    if not room_number.isnumeric() or int(room_number) < 0 or int(room_number) > 1716:
        return Response({'error': 'Invalid room number value'}, status=status.HTTP_400_BAD_REQUEST)
    room_number = int(room_number)

    # Check if passwords match
    if not password == confirmation:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if room is occupied
    room = Room.objects.filter(number=room_number).exists()
    if room and Room.objects.get(number=room_number).user:
        return Response({'error': 'Room is already occupied'}, status=status.HTTP_400_BAD_REQUEST)

    # Try to register the user
    try:
        user = User.objects.create_user(username=username, password=password)
        user.save()
    except IntegrityError:
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Calculate the floor
    if room_number < 100:
        floor = 1
    else:
        floor = int(room_number / 100)

    if room:
        room = Room.objects.get(number=room_number)
        room.user = user
    else:
        room = Room(user=user, number=room_number, floor=floor)
    room.save()
    login(request, user)

    user = UserSerializer(user)
    return Response(user.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def login_view(request):
    print(request.data['username'])
    try:
        username = request.data['username']
        password = request.data['password']
    except KeyError:
        return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out'}, status=status.HTTP_200_OK)


@api_view(['GET'])
def is_auth_view(request):
    if request.user.is_authenticated:
        user = UserSerializer(request.user)
        return Response(user.data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
@ensure_csrf_cookie
def get_CSRF(request):
    return Response({"success": "CSRF cookie set"}, status=status.HTTP_200_OK)
