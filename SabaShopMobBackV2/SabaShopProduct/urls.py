from django.urls import path
from .views import createOrder,deleteProduct,getProduct,getFactors,getAllSimilarProducts,setSliderImage,getAllNewestProducts,getHistoryOrder,getProductBarcode,putProduct, getSliderImage,getSimilarProducts,getNewestProducts,getFirstProducts
urlpatterns = [
    path("getproduct",getProduct),
    path("getproduct/<int:groupid>/<int:groupid2>",getProduct),
    path("getproductbarcode",getProductBarcode),
    path("deleteproduct/<int:pk>",deleteProduct),
    path("createorder",createOrder),
    path("gethistoryorder",getHistoryOrder),
    path("updateproductimage/<int:pk>",putProduct),
    path("getsimilarproducts/<int:distinctId>",getSimilarProducts),
    path("getallsimilarproducts/<int:distinctId>",getAllSimilarProducts),
    path("getnewestproducts",getNewestProducts),
    path("getallnewestproducts",getAllNewestProducts),
    path("getfirstproducts",getFirstProducts),
    path("getSliderImage",getSliderImage),
    path("setSliderImage",setSliderImage),
    path("getFactor/<int:customerId>",getFactors),
  
    ]