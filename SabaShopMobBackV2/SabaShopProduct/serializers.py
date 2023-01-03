
from rest_framework import serializers

from SabaShopUser.models import CustomerUser, SUser, UserSetting
from .models import Product,Order,sliderImage,Factor

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id","nam","unit","unit2","numb","pic_path","price","price1","box")

    def create(self, validated_data):
        return super().create(validated_data)



class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id","pic_path")

    def create(self, validated_data):
        return super().create(validated_data)



class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = sliderImage
        fields = "__all__"




class FactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factor
        fields = "__all__"






class HistoryOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("iduser","cod","numb","idcast","price","dat")
    def to_representation(self, instance):
        order = super().to_representation(instance)
        user = SUser.objects.filter(id=order.get("iduser")).first()
        product = Product.objects.filter(id=order.get("cod")).first()
        customer = CustomerUser.objects.filter(id=order.get("idcast")).first()
        order.pop("cod")
        order.pop("idcast")
        order.pop("iduser")
        order["user"] = user.nam
        order["product"] = product.nam
        order["customer"] = customer.nam
        return order



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"