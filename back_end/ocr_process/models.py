from django.db import models


class File(models.Model):
    file = models.FileField(blank=False, null=False)

    def __str__(self):
        return self.file.name


class DocumentModel(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class LabelInDocument(models.Model):
    document = models.ForeignKey(DocumentModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    content_type = models.CharField(max_length=10)
    start_x = models.FloatField()
    start_y = models.FloatField()
    end_x = models.FloatField()
    end_y = models.FloatField()

    def __str__(self):
        return '{} {}'.format(self.document, self.name)


class Tasks(models.Model):
    unique_name = models.TextField(unique=True)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.unique_name
