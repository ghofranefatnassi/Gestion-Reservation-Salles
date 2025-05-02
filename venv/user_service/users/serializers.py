from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, UserRole
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name', 
            'is_active', 'date_joined', 'role',
            'is_staff', 'is_superuser'
        ]
        read_only_fields = [
            'id', 'is_active', 'date_joined',
            'is_staff', 'is_superuser'
        ]

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        min_length=8,
        max_length=128
    )
    password_confirmation = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )
    role = serializers.ChoiceField(
        choices=UserRole.choices,
        default=UserRole.VISITOR,
        required=False
    )

    class Meta:
        model = CustomUser
        fields = [
            'email', 'password', 'password_confirmation',
            'first_name', 'last_name', 'role'
        ]
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def validate(self, data):
        if data['password'] != data['password_confirmation']:
            raise serializers.ValidationError("Passwords don't match")
        
        if data.get('role') == UserRole.ADMIN:
            raise serializers.ValidationError(
                "Cannot create admin users through signup"
            )
            
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirmation')
        return CustomUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        email = attrs.get('email').lower()
        password = attrs.get('password')
        
        user = authenticate(
            request=self.context.get('request'),
            email=email,
            password=password
        )
        
        if not user:
            raise serializers.ValidationError("Invalid credentials")
            
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")
            
        attrs['user'] = user
        return attrs