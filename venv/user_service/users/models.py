from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', UserRole.ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)

class UserRole(models.TextChoices):
    ADMIN = 'ADMIN', _('Admin')
    EMPLOYEE = 'EMPLOYEE', _('Employee')
    VISITOR = 'VISITOR', _('Visitor')

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('superuser status'), default=False)
    role = models.CharField(
        _('role'),
        max_length=10,
        choices=UserRole.choices,
        default=UserRole.VISITOR
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # Automatically set is_staff based on role
        if self.role in [UserRole.ADMIN, UserRole.EMPLOYEE]:
            self.is_staff = True
        else:
            self.is_staff = False
        
        # Ensure admins are superusers
        if self.role == UserRole.ADMIN:
            self.is_superuser = True
        
        super().save(*args, **kwargs)

    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN

    @property
    def is_employee(self):
        return self.role == UserRole.EMPLOYEE

    @property
    def is_visitor(self):
        return self.role == UserRole.VISITOR

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        ordering = ['-date_joined']