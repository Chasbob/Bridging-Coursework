from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import WorkEvent, Project
from .serializers import WorkSerializer, ProjectkSerializer


@api_view(['GET', 'POST'])
def work_list(request):
    if request.method == 'GET':
        data = WorkEvent.objects.all()

        serializer = WorkSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

@api_view(['GET', 'POST'])
def project_list(request):
    if request.method == 'GET':
        data = Project.objects.all()

        serializer = ProjectkSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)