from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking
from .serializers import BookingSerializer
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.decorators import action

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
    
    def perform_create(self, serializer):
        """Set the user_id to current user when creating"""
        serializer.save(user_id=self.request.user.id)
    
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