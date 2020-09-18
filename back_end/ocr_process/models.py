from django.db import models


class File(models.Model):
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.file.name


class DocumentModel(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class LabelInDocument(models.Model):
    document = models.ForeignKey(DocumentModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    content_type = models.CharField(max_length=10)
    start_x = models.IntegerField()
    start_y = models.IntegerField()
    end_x = models.IntegerField()
    end_y = models.IntegerField()

    def __str__(self):
        return '{} {}'.format(self.document, self.name)
