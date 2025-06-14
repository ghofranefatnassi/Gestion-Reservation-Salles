from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel
    path('api/', include('bookings.urls')),  # Includes all booking URLs under /api/
]
