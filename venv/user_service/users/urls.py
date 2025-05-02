from django.urls import path
from .views import (
    SignUpView,
    LoginView,
    GoogleLoginView,
    UserProfileView,
    UserListView,
    UserDetailView,
    AdminCreateUserView,
    CreateUserView
)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('google/', GoogleLoginView.as_view(), name='google_login'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('users/', UserListView.as_view(), name='user_list'),      
    path('create-user/', CreateUserView.as_view(), name='create-user'), 
    path('users/<int:id>/', UserDetailView.as_view(), name='user_detail'), 
    path('api/admin/create-user/', AdminCreateUserView.as_view(), name='admin-create-user'),
]