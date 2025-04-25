from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Room, Amenity
from .serializers import RoomSerializer, AmenitySerializer
from .filters import RoomFilter

# ✅ List and Create Rooms
class RoomListView(generics.ListCreateAPIView):
    queryset = Room.objects.filter(is_active=True)
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = RoomFilter
    search_fields = ['name', 'room_type']
    ordering_fields = ['name', 'floor', 'capacity']

# ✅ Retrieve, Update, Soft Delete Room
class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # Soft delete: just mark as inactive
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

# ✅ Amenity List View
class AmenityListView(generics.ListCreateAPIView):
    queryset = Amenity.objects.all()
    serializer_class = AmenitySerializer
    pagination_class = None
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
