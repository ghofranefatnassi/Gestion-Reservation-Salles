from django.urls import path,include
from .views import BookingViewSet
from rest_framework.routers import DefaultRouter

# Initialize the DefaultRouter to automatically generate routes for the viewset
router = DefaultRouter()
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('', include(router.urls)),  # This will include all the router-generated URLs under /bookings/
]
