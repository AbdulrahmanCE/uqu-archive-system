from django.contrib import admin

# Register your models here.
from ocr_process.models import *

admin.site.register(File)
admin.site.register(DocumentModel)
admin.site.register(LabelInDocument)
admin.site.register(Tasks)
