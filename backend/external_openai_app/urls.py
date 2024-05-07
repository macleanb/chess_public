from .views import PossibleMoves
from django.urls import path

app_name = 'external_openai_app'

urlpatterns = [
    path('', PossibleMoves.as_view(), name='possiblemoves')
]
