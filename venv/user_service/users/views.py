from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignUpSerializer, LoginSerializer, UserSerializer
from django.contrib.auth import authenticate
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .models import CustomUser

class SignUpView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = SignUpSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        print("Incoming login data:", request.data)  # Debug
        
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  # Debug
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.validated_data['user']
        print("Authenticated user:", user.email)  # Debug
        
        refresh = RefreshToken.for_user(user)
        return Response({
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
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'id'