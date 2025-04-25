from django.contrib import admin
from bookings.models import Booking, BookingStatus

class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_id', 'user_id', 'title', 'start_time', 'end_time', 'status', 'created_at', 'updated_at', 'participants')
    search_fields = ('title', 'description', 'user_id')
    list_filter = ('status', 'start_time', 'end_time')
    ordering = ('start_time',)
    readonly_fields = ('id', 'created_at', 'updated_at')  # Make some fields readonly to avoid accidental edits

    # Custom method to allow admin to change the status to "Completed" or "Cancelled"
    actions = ['mark_as_completed', 'mark_as_cancelled']

    def mark_as_completed(self, request, queryset):
        """Custom admin action to mark bookings as completed."""
        queryset.update(status=BookingStatus.COMPLETED)
    mark_as_completed.short_description = "Mark selected bookings as completed"

    def mark_as_cancelled(self, request, queryset):
        """Custom admin action to cancel bookings."""
        queryset.update(status=BookingStatus.CANCELLED)
    mark_as_cancelled.short_description = "Mark selected bookings as cancelled"

    def get_participants(self, obj):
        """Display participants as a comma-separated string."""
        return ", ".join(str(participant) for participant in obj.participants)
    get_participants.short_description = 'Participants'

admin.site.register(Booking, BookingAdmin)
