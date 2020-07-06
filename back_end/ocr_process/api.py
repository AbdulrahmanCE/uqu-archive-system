from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import FileSerializer
from .table import start
import os


class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            print(file_serializer.data['file'][1:])
            p = start(file_serializer.data['file'][1:])
            os.remove(file_serializer.data['file'][1:])
            # return Response(file_serializer.data, status=status.HTTP_201_CREATED)
            return Response({'key': p}, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
