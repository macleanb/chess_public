# External imports
from rest_framework.routers import DefaultRouter
from django.urls import path

# Internal Imports
from .views import GameViewSet

app_name = 'games_app'

game_router = DefaultRouter()
game_router.register(r'', GameViewSet, basename='game_viewset')
urlpatterns = game_router.urls
