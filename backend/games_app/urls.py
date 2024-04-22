# External imports
from rest_framework.routers import DefaultRouter
from django.urls import path

# Internal Imports
# from .views import GameViewSet
from .views import GamesView, GameView

app_name = 'games_app'

# game_router = DefaultRouter()
# game_router.register(r'', GameViewSet, basename='game_viewset')
# urlpatterns = game_router.urls

urlpatterns = [
    path('', GamesView.as_view(), name='all_games'),
    path('<int:game_id>/', GameView.as_view(), name='a_game'),
]