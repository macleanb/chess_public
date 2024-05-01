from .views import PossibleMoves, FaceComputer
from django.urls import path

app_name = 'external_openai_app'

urlpatterns = [
    path('', PossibleMoves.as_view(), name='possiblemoves'),
    path('computer_move/', FaceComputer.as_view(), name='computermove'),
]
