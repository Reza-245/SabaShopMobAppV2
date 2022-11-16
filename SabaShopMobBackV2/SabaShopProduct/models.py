from django.db import models

# Create your models here.
class Product(models.Model):
    nam = models.CharField(max_length=150)
    unit = models.CharField(max_length=50)
    unit2 = models.CharField(max_length=50)
    numb = models.IntegerField()
    box = models.IntegerField()
    price = models.IntegerField()
    price1 = models.IntegerField()
    pic_path = models.ImageField(upload_to="products",null=True)
    mainid = models.IntegerField()
    idanbar = models.IntegerField()
    class Meta:
        db_table = "prc"



class Order(models.Model):
    cod = models.IntegerField()
    numb = models.DecimalField(max_digits=21,decimal_places=6)
    idcast = models.IntegerField()
    iduser = models.IntegerField()
    class Meta:
        db_table = "prctmp"