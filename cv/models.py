from django.db import models

# Create your models here.

class ItemCategory(models.Model):
    name = models.CharField(max_length=50)

class CVItem(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=20)
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
