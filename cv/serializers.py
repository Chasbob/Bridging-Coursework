from rest_framework import serializers
from .models import WorkEvent, Project

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkEvent
        fields = ('title', 'location', 'start_date', 'end_date')

class ProjectkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('title', 'source', 'description', 'view')