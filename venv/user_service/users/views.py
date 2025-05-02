from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .models import CustomUser, UserRole
from .serializers import SignUpSerializer, LoginSerializer, UserSerializer
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import AllowAny


class CreateUserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SignUpView(APIView):
    """
    Public user registration endpoint
    Only allows creating VISITOR or EMPLOYEE roles
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            # Prevent admin creation through public signup
            if serializer.validated_data.get('role') == UserRole.ADMIN:
                return Response(
                    {"error": "Cannot create admin users through this endpoint"},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminCreateUserView(APIView):
    """
    Admin-only endpoint for user creation
    Allows creating all roles (ADMIN, EMPLOYEE, VISITOR)
    """
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })

class GoogleLoginView(APIView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        adapter = self.adapter_class()
        client = self.client_class(
            request,
            adapter.client_id,
            adapter.secret,
            adapter.access_token_method,
            adapter.access_token_url,
            adapter.callback_url,
            adapter.scope,
        )
        
        token = adapter.parse_token(request.data)
        token = client.get_access_token(token)
        user = adapter.complete_login(request, token)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Get or update the authenticated user's profile
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    """
    List all users (admin only)
    Can filter by role: /api/users/?role=ADMIN
    """
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        if role in [UserRole.ADMIN, UserRole.EMPLOYEE, UserRole.VISITOR]:
            queryset = queryset.filter(role=role)
        return queryset.order_by('-date_joined')

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a user (admin only)
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

    def perform_update(self, serializer):
        instance = serializer.save()
        # Prevent admins from removing their own admin status
        if (self.request.user == instance and 
            'role' in serializer.validated_data and 
            serializer.validated_data['role'] != UserRole.ADMIN):
            raise permissions.PermissionDenied("Cannot remove your own admin status")

class ChangeUserRoleView(APIView):
    """
    Special endpoint for changing user roles (admin only)
    """
    permission_classes = [IsAdminUser]

    def patch(self, request, user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
            new_role = request.data.get('role')
            
            if new_role not in UserRole.values:
                return Response(
                    {"error": "Invalid role"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Prevent modifying own admin status
            if request.user == user and new_role != UserRole.ADMIN:
                return Response(
                    {"error": "Cannot remove your own admin status"},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            user.role = new_role
            user.save()
            
            return Response(
                {"message": f"Role updated to {new_role}"},
                status=status.HTTP_200_OK
            )
        except CustomUser.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )