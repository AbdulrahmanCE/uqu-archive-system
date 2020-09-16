import json
import threading
import datetime
from pdf2image import convert_from_path, convert_from_bytes
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from uqu_archiv_system.settings import BASE_DIR
from .serializers import FileSerializer
import os
import fitz

from .table import start


def pdf2image(path):
    doc = fitz.open(path)
    data = []

    for pg in range(doc.pageCount):
        page = doc[pg]
        rotate = int(0)
        # Each size has a scaling factor of 2, which will give us an image that is quadrupled in resolution.
        zoom_x = 10.0
        zoom_y = 10.0
        trans = fitz.Matrix(zoom_x, zoom_y).preRotate(rotate)
        pm = page.getPixmap(matrix=trans, alpha=False)

        new_path = "media/images_from_pdf/page_{}_{}.jpg".format(pg, str.split(path, "/")[-1][:-4])
        pm.writePNG(new_path)
        output_text = start(new_path)
        print(output_text)
        data.append(output_text)
        # os.remove(new_path)
    with open('ocr_process/output.json', 'w', encoding='utf8') as outfile:
        json.dump(data, outfile, sort_keys=True, indent=4, ensure_ascii=False)
    doc.close()
    # os.remove(path)


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            # path = os.path.join(BASE_DIR, file_serializer.data['file'][1:])
            path = str(file_serializer.data['file'][1:])
            if path.endswith('.pdf') or path.endswith('.PDF'):
                x = threading.Thread(target=pdf2image, daemon=True, args=(path,))
                x.start()
                # pdf2image(path)
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
                pdf2image(path)
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
