from rest_framework import serializers
from .models import CVItem, ItemCategory

class CVItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CVItem
        fields = ('id', 'title', 'icon', 'location', 'description', 'category')

class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ('id', 'name')
