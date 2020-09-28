from django.urls import path

from .api import FileUploadView, ModelBBOXESUpload
from .views import *

urlpatterns = [
    path('upload', FileUploadView.as_view()),
    path('new_form', ModelBBOXESUpload.as_view())
]