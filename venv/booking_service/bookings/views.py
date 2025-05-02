from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
import requests

from bookings.models import Booking, BookingStatus
from bookings.serializers import BookingSerializer


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['room_id', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['start_time', 'end_time', 'created_at']
    ordering = ['start_time']

    def get_queryset(self):
        """Return only bookings for the current user"""
        return Booking.objects.filter(user_id=self.request.user.id)

    def validate_user_and_room(self, user_id, room_id):
        """Validate existence of user and room from external microservices"""
        # Validate user from user_service
        user_response = requests.get(f'http://localhost:8000/api/users/{user_id}/')
        if user_response.status_code != 200:
            raise serializers.ValidationError({'user_id': 'Invalid user ID (not found in user service).'})

        # Validate room from room_service
        room_response = requests.get(f'http://localhost:8001/api/rooms/{room_id}/')
        if room_response.status_code != 200:
            raise serializers.ValidationError({'room_id': 'Invalid room ID (not found in room service).'})

    def perform_create(self, serializer):
        """Set user and validate with external services before creating"""
        user_id = self.request.user.id
        room_id = serializer.validated_data.get('room_id')

        self.validate_user_and_room(user_id, room_id)
        serializer.save(user_id=user_id)

    def perform_update(self, serializer):
        """Validate room again on update (if modified)"""
        room_id = serializer.validated_data.get('room_id', None)
        if room_id:
            self.validate_user_and_room(self.request.user.id, room_id)

        serializer.save()

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Custom action to cancel a booking"""
        booking = self.get_object()

        if booking.status != BookingStatus.CONFIRMED:
            return Response(
                {"detail": "Only confirmed bookings can be cancelled"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if booking.start_time < timezone.now():
            return Response(
                {"detail": "Cannot cancel past bookings"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = BookingStatus.CANCELLED
        booking.save()
        return Response({"status": "Booking cancelled"})

    @action(detail=True, methods=['post'])
    def add_participant(self, request, pk=None):
        """Add participant to booking"""
        booking = self.get_object()
        participant_id = request.data.get('user_id')

        if not participant_id:
            return Response(
                {"detail": "user_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Optional: validate participant exists via user_service
        response = requests.get(f'http://localhost:8000/api/users/{participant_id}/')
        if response.status_code != 200:
            return Response(
                {"detail": "Participant user not found in user_service"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.add_participant(participant_id)
        booking.save()
        return Response({"status": "Participant added"})

    @action(detail=True, methods=['post'])
    def remove_participant(self, request, pk=None):
        """Remove participant from booking"""
        booking = self.get_object()
        participant_id = request.data.get('user_id')

        if not participant_id:
            return Response(
                {"detail": "user_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.remove_participant(participant_id)
        booking.save()
        return Response({"status": "Participant removed"})
