from django.db import models

# Create your models here.

class WorkEvent(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    

class Project(models.Model):
    title = models.CharField(max_length=100)
    source =  models.URLField(default='https://github.com')
    view =  models.URLField(default='https://github.com')
    description = models.TextField()
