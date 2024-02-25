from django.urls import path
from . import views

app_name = 'chess_users'
urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('authenticateduser', views.AuthenticatedUserView.as_view(), name='authenticateduser'),
    path('', views.UsersView.as_view(), name='users_view'),
    path('<int:user_id>/', views.UserView.as_view(), name='user_view'),
]