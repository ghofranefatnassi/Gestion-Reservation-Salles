from django.contrib import admin
from .models import Room, Amenity

@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name', 'description')
    list_filter = ('name',)

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'room_type', 'floor', 'capacity', 'is_active')  # removed 'created_by'
    list_filter = ('room_type', 'floor', 'is_active')
    search_fields = ('name',)
    filter_horizontal = ('amenities',)
    readonly_fields = ('created_at', 'updated_at')
