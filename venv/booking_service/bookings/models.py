from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.utils import timezone
import json

class BookingStatus(models.TextChoices):
    CONFIRMED = 'CONFIRMED', _('Confirmed')
    CANCELLED = 'CANCELLED', _('Cancelled')
    COMPLETED = 'COMPLETED', _('Completed')

class Booking(models.Model):
    room_id = models.PositiveIntegerField()
    user_id = models.PositiveIntegerField()
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=BookingStatus.choices,
        default=BookingStatus.CONFIRMED
    )
    participants = models.JSONField(default=list)  # List of user IDs
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['start_time']
        verbose_name = _('Booking')
        verbose_name_plural = _('Bookings')
        constraints = [
            models.CheckConstraint(
                check=models.Q(end_time__gt=models.F('start_time')),
                name='end_time_after_start_time'
            ),
            # Removed the timezone.now() constraint as it's not reliable in migrations
        ]
    
    def __str__(self):
        return f"Booking #{self.id} - {self.title} ({self.get_status_display()})"
    
    def clean(self):
        """Additional validation that can be called before save"""
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be after start time")
            
        if self.start_time < timezone.now():
            raise ValidationError("Cannot create booking in the past")
        
        # Additional business logic validation can go here
    
    def save(self, *args, **kwargs):
        """Override save to include clean validation"""
        self.clean()
        super().save(*args, **kwargs)
    
    def is_active(self):
        """Check if booking is currently active (in progress)"""
        now = timezone.now()
        return self.status == BookingStatus.CONFIRMED and self.start_time <= now <= self.end_time
    
    def duration(self):
        """Calculate duration in hours"""
        return (self.end_time - self.start_time).total_seconds() / 3600
    
    def add_participant(self, user_id):
        """Add a participant to the booking"""
        if user_id not in self.participants:
            self.participants = self.participants + [user_id]  # Creates new list to trigger change
    
    def remove_participant(self, user_id):
        """Remove a participant from the booking"""
        if user_id in self.participants:
            self.participants = [pid for pid in self.participants if pid != user_id]
    
    def cancel(self):
        """Cancel the booking"""
        if self.status == BookingStatus.CONFIRMED:
            self.status = BookingStatus.CANCELLED
            self.save()
    
    def complete(self):
        """Mark booking as completed"""
        if self.status == BookingStatus.CONFIRMED and timezone.now() > self.end_time:
            self.status = BookingStatus.COMPLETED
            self.save()