from django.urls import path

from .api import *
from .views import *

urlpatterns = [
    path('models', RetrieveModels.as_view()),
    path('upload', FileUploadView.as_view()),
    path('new_form', ModelBBOXESUpload.as_view()),
    path('check_task', RetrieveTaskResult.as_view())
]
