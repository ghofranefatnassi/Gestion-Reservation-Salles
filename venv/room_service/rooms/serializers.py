from rest_framework import serializers
from .models import Room, Amenity, RoomType

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name', 'description', 'icon']
        read_only_fields = ['id']

class RoomSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)
    room_type_display = serializers.CharField(source='get_room_type_display', read_only=True)

    class Meta:
        model = Room
        fields = [
            'id', 'name', 'room_type', 'room_type_display', 
            'capacity', 'floor', 'amenities', 'has_projector',
            'has_whiteboard', 'has_video_conference', 'is_active',
             'created_at', 'updated_at'
        ]
        read_only_fields = [ 'created_at', 'updated_at']