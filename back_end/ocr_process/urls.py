from django.urls import path

from .api import FileUploadView
from .views import *

urlpatterns = [
    path('upload', FileUploadView.as_view())
]