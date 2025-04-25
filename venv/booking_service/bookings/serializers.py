from rest_framework import serializers
from bookings.models import Booking, BookingStatus
from django.utils import timezone

class BookingSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    duration = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Booking
        fields = [
            'id', 'room_id', 'user_id', 'title', 'description',
            'start_time', 'end_time', 'status', 'status_display',
            'participants', 'is_active', 'duration',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['user_id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Custom validation for booking data"""
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError("End time must be after start time")
            
        if data['start_time'] < timezone.now():
            raise serializers.ValidationError("Cannot create booking in the past")
            
        return data
    
    def validate_participants(self, value):
        """Validate participants JSON field"""
        if not isinstance(value, list):
            raise serializers.ValidationError("Participants must be a list of user IDs")
        return value