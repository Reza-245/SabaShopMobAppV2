from django.db import models

# Create your models here.
class SUser(models.Model):
    nam = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    class Meta:
        db_table="users"




class CustomerUser(models.Model): 
    nam = models.CharField(max_length=50)
    tel = models.CharField(max_length=11)
    adr = models.CharField(max_length=150)
    is_valid = models.BooleanField()
    class Meta:
        db_table="webcast_store"



class UserSetting(models.Model):
    nagative_forosh = models.BooleanField()
    gfs14 = models.BooleanField()

    class Meta:
        db_table="userseting"