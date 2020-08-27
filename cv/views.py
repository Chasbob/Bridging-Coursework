from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import CVItem, ItemCategory
from .serializers import CVItemSerializer, ItemCategorySerializer


@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        data = CVItem.objects.all()

        serializer = CVItemSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    

    elif request.method == 'POST':
        serializer = CVItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def type_list(request):
    if request.method == 'GET':
        data = ItemCategory.objects.all()

        serializer = ItemCategorySerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)
    

    elif request.method == 'POST':
        serializer = ItemCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_type(request, pk):
    try:
        data = CVItem.objects.all().filter(category=pk)
        serializer = CVItemSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    except CVItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def get_item(request, pk):
    try:
        data = CVItem.objects.get(pk=pk)
    except CVItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        try:
            serializer = CVItemSerializer(data, context={'request': request}, many=False)
            return Response(serializer.data)
        except CVItem.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'PUT':
        serializer = CVItemSerializer(data, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(data={}, status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        data.delete()
        return Response(data={}, status=status.HTTP_202_ACCEPTED)