from .views import SuggestedMove
from django.urls import path

app_name = 'external_stockfish_app'

urlpatterns = [
    path('<int:game_id>/', SuggestedMove.as_view(), name='suggestedmove')
]
