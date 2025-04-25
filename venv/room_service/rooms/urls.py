from django.urls import path
from .views import RoomListView, RoomDetailView, AmenityListView

urlpatterns = [
    path('rooms/', RoomListView.as_view(), name='room-list'),
    path('rooms/<int:pk>/', RoomDetailView.as_view(), name='room-detail'),
    path('amenities/', AmenityListView.as_view(), name='amenity-list'),
]
