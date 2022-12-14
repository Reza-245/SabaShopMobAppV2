from pyexpat import model
from rest_framework import serializers
from SabaShopUser.models import SUser , CustomerUser,UserSetting

class SUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SUser
        fields =  ('nam','password','id')
 

class UserSettingSerailizer(serializers.ModelSerializer):
    class Meta:
        model = UserSetting
        fields =  "__all__"



class CustomerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerUser
        fields =  ('nam','id')
 
