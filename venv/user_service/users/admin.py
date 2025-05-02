from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _
from .models import CustomUser, UserRole

class CustomUserAdmin(UserAdmin):
    list_display = (
        'email', 'first_name', 'last_name', 
        'role', 'is_active', 'is_staff', 'date_joined'
    )
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'role'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'password1', 'password2',
                'first_name', 'last_name', 'role',
                'is_active', 'is_staff', 'is_superuser'
            ),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    filter_horizontal = ()

    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        
        if not is_superuser:
            form.base_fields['role'].choices = [
                (UserRole.EMPLOYEE, _('Employee')),
                (UserRole.VISITOR, _('Visitor'))
            ]
            form.base_fields['is_superuser'].disabled = True
            
        return form

admin.site.register(CustomUser, CustomUserAdmin)