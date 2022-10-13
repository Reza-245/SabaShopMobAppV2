from pyexpat import model
from rest_framework import serializers
from .models import Category,Category2

class Cat1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields  = ("nam",)

    def create(self, validated_data):
        return super().create(validated_data)

class Cat2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Category2
        fields = "__all__"
        read_only_fields  = ("nam","rowv")

    def create(self, validated_data):
        return super().create(validated_data)