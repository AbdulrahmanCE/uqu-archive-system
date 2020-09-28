from django.db import IntegrityError
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status

from ocr_process.models import File, LabelInDocument, DocumentModel


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentModel
        fields = "__all__"


class LabelSerializer(serializers.ModelSerializer):
    document = serializers.IntegerField(required=False)

    class Meta:
        model = LabelInDocument
        fields = "__all__"


class ReceiveFileSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):

        doc = DocumentModel.objects.create(name=validated_data['name'])

        for label in validated_data['labels']:
            LabelInDocument.objects.create(
                document=doc,
                name=label['name'],
                start_x=label['start_x']/validated_data['img_width'],
                start_y=label['start_y']/validated_data['img_height'],
                end_x=label['end_x']/validated_data['img_width'],
                end_y=label['end_y']/validated_data['img_height'],
            )
        return True
    name = serializers.CharField(max_length=50)
    img_height = serializers.FloatField()
    img_width = serializers.FloatField()
    labels = LabelSerializer(many=True)

