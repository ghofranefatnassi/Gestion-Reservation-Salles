from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _

class RoomType(models.TextChoices):
    MEETING = 'MEETING', _('Meeting Room')
    CONFERENCE = 'CONFERENCE', _('Conference Room')
    TRAINING = 'TRAINING', _('Training Room')
    FOCUS = 'FOCUS', _('Focus Room')

class Amenity(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return self.name
    
    def __str__(self):
        return self.name

class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    room_type = models.CharField(
        max_length=20,
        choices=RoomType.choices,
        default=RoomType.MEETING
    )
    capacity = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)]
    )
    floor = models.IntegerField()
    amenities = models.ManyToManyField(Amenity, blank=True)
    has_projector = models.BooleanField(default=False)
    has_whiteboard = models.BooleanField(default=False)
    has_video_conference = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['floor', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.get_room_type_display()})"