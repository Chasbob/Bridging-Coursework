import logging
import re
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Post
from .serializers import *

logger = logging.getLogger(__name__)

def is_integer(n):
    try:
        float(n)
    except ValueError:
        return False
    else:
        return float(n).is_integer()


@api_view(['GET', 'POST'])
def post_list(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try:
        if is_integer(pk):
            data = Post.objects.get(pk=pk)
        else:
            data = Post.objects.get(title=re.sub(r'-', ' ', pk))
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        data = None
        if is_integer(pk):
            data = Post.objects.get(pk=pk)
        else:
            data = Post.objects.get(title=re.sub(r'[-/]', ' ', pk))
        serializer = PostSerializer(data, context={'request': request}, many=False)
        return Response(serializer.data)


    if request.method == 'PUT':
        serializer = PostSerializer(data, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(data={}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        data.delete()
        return Response(data={}, status=status.HTTP_202_ACCEPTED)

