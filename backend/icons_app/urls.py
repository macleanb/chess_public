from .views import IconViewSet
from rest_framework.routers import DefaultRouter

app_name = 'icons_app'

icon_router = DefaultRouter()
icon_router.register(r'', IconViewSet, basename='icon_viewset')
urlpatterns = icon_router.urls
