import json
import threading

from django.db import IntegrityError
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *

from uqu_archiv_system.settings import BASE_DIR
from .serializers import FileSerializer, ReceiveFileSerializer, DocumentSerializer
import os
import fitz

from .table import start_ocr


def pdf_ocr(path, rotate, model_id, task_id):
    doc = fitz.open(path)
    data = []
    for pg in range(doc.pageCount):
        page = doc[pg]
        # Each size has a scaling factor of 2, which will give us an image that is quadrupled in resolution.
        zoom_x = 2.0
        zoom_y = 2.0
        trans = fitz.Matrix(zoom_x, zoom_y).preRotate(rotate)
        pm = page.getPixmap(matrix=trans, alpha=False)
        w = pm.width
        h = pm.height
        doc_model = get_object_or_404(DocumentModel, pk=model_id)
        labels = list(LabelInDocument.objects.filter(document=doc_model).values())
        boxes_and_labels = {"boxes": [], "labels": []}
        for i in labels:
            boxes_and_labels["boxes"].append(
                [int(i['start_x'] * w), int(i['start_y'] * h), int(i['end_x'] * w), int(i['end_y'] * h)])
            boxes_and_labels["labels"].append(i['name'])

        new_path = "media/images_from_pdf/page_{}_{}.jpg".format(pg, str.split(path, "/")[-1][:-4])
        pm.writePNG(new_path)
        output_text = start_ocr(new_path, boxes_and_labels)
        # print(output_text)
        data.append(output_text)
        os.remove(new_path)
    with open('ocr_process/result/{}.json'.format(task_id), 'w', encoding='utf8') as outfile:
        json.dump(data, outfile, sort_keys=True, indent=4, ensure_ascii=False)
    doc.close()
    task = Tasks.objects.get(unique_name=task_id)
    task.is_done = True
    task.save()

    return data

class RetrieveModels(APIView):
    def get(self, request):
        models = DocumentModel.objects.all()
        return Response(DocumentSerializer(models, many=True).data)

class RetrieveTaskResult(APIView):
    def get(self, request):
        task_id = request.GET.get('task_id')
        if task_id:
            task = get_object_or_404(Tasks, unique_name=task_id)
            if task.is_done:
                data = {}
                with open('ocr_process/result/{}.json'.format(task_id), 'r', encoding='utf8') as f:
                    data = json.load(f)
                os.remove('ocr_process/result/{}.json'.format(task_id))
                task.delete()
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response({'state': "still processing"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error message": "task_id is required"}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            path = str(file_serializer.data['file'][1:])
            if path.endswith('.pdf') or path.endswith('.PDF'):
                file_id = int(request.POST.get('file_id', '0'))
                rotate_doc = int(request.POST.get('rotate', 0))
                model_id = int(request.POST.get('model_id', 0))
                task = Tasks.objects.create(unique_name=path[:-4], is_done=False)
                x = threading.Thread(target=pdf_ocr, daemon=True, args=(path, rotate_doc, model_id, task.unique_name,))
                x.start()
                # data = pdf_ocr(path, rotate_doc, model_id)

                return Response({"task_id": "{}".format(task.unique_name)}, status=status.HTTP_202_ACCEPTED)
            else:
                os.remove(path)

                return Response({"FormatError": "The uploaded file must be in pdf format"},
                                status=status.HTTP_400_BAD_REQUEST)

            # p = start(file_serializer.data['file'][1:])

            # return Response(file_serializer.data, status=status.HTTP_201_CREATED)
            # return Response({'state': "File uploaded successfully, please wait until the process finish"},
            #                 status=status.HTTP_200_OK)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ModelBBOXESUpload(APIView):

    def post(self, request):
        data = request.data['template']
        serializer = ReceiveFileSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            try:
                serializer.create(validated_data=serializer.validated_data)
            except IntegrityError as e:
                return Response(
                    {"error message": "Template name '{}' already exist".format(request.data['template']['name'])},
                    status=status.HTTP_409_CONFLICT)
            return Response({"state": "template stored successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "error"}, status=status.HTTP_400_BAD_REQUEST)


class FileUploadAPI(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            # path = os.path.join(BASE_DIR, file_serializer.data['file'][1:])
            path = str(file_serializer.data['file'][1:])
            if path.endswith('.pdf') or path.endswith('.PDF'):
                # x = threading.Thread(target=pdf2image, daemon=True, args=(path,))
                # x.start()
                pdf_ocr(path)
                # os.remove(path)
            else:
                os.remove(path)
                return Response({"FormatError": "The uploaded file must be in pdf format"},
                                status=status.HTTP_400_BAD_REQUEST)

            # p = start(file_serializer.data['file'][1:])

            # return Response(file_serializer.data, status=status.HTTP_201_CREATED)
            return Response({'state': "File uploaded successfully, please wait until the process finish"},
                            status=status.HTTP_200_OK)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
