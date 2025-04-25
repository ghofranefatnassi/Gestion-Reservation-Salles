import django_filters
from .models import Room, Amenity  # Add Amenity to the imports

class RoomFilter(django_filters.FilterSet):
    min_capacity = django_filters.NumberFilter(field_name='capacity', lookup_expr='gte')
    max_capacity = django_filters.NumberFilter(field_name='capacity', lookup_expr='lte')
    has_amenities = django_filters.ModelMultipleChoiceFilter(
        field_name='amenities',
        queryset=Amenity.objects.all(),
        conjoined=True  # Requires ALL selected amenities
    )
    
    class Meta:
        model = Room
        fields = {
            'room_type': ['exact'],
            'floor': ['exact'],
            'has_projector': ['exact'],
            'has_whiteboard': ['exact'],
            'has_video_conference': ['exact'],
            'is_active': ['exact'],
        }