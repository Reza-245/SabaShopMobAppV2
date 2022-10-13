from django.urls import path
from .views import getCategory,getCategory2,createcategory,updateCat1,updateCat2
urlpatterns=[
    
    path("getcategory1",getCategory),
    path("getcategory2",getCategory2),
    path("createcategory",createcategory),
    path("updatecat1image/<int:pk>",updateCat1),
    path("updatecat2image/<int:pk>",updateCat2)
    
    ]