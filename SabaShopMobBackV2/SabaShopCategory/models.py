from django.db import models

# Create your models here.
class Category(models.Model):
    nam = models.CharField(max_length=50)
    pic_path = models.ImageField(upload_to="category1",null=True)
    class Meta:
        db_table = "kalagroup"


class Category2(models.Model):
    nam = models.CharField(max_length=50)
    rowv = models.IntegerField()
    pic_path = models.ImageField(upload_to="category2",null=True)
    class Meta:
        db_table = "kalagroup2"