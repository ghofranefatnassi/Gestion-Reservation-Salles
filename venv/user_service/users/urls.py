from django.urls import path
from .views import (
    SignUpView,
    LoginView,
    GoogleLoginView,
    UserProfileView,
    UserListView,
    UserDetailView
)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('google/', GoogleLoginView.as_view(), name='google_login'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('users/', UserListView.as_view(), name='user_list'),
    path('users/<int:id>/', UserDetailView.as_view(), name='user_detail'),
]