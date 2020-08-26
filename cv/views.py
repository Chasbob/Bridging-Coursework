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
