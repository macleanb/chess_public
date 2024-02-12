from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.settings import api_settings
from .models import Icon
from .serializers import IconSerializer

class IconViewSet(viewsets.ModelViewSet):
    """
    This class automates views for Icon objects
    """
    queryset = Icon.objects.all()
    serializer_class = IconSerializer
    parser_classes = (MultiPartParser, FormParser)
    #permission_classes = [*api_settings.DEFAULT_PERMISSION_CLASSES, DjangoModelPermissions, IconPermissions]
