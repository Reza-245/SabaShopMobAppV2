from django.urls import path
from .views import createOrder,deleteProduct,getProduct,getHistoryOrder,getProductBarcode,putProduct,getFavorites,getSimilarProducts,getShopProducts,getNewestProducts,getFirstProducts
urlpatterns = [
    path("getproduct",getProduct),
    path("getproduct/<int:groupid>/<int:groupid2>",getProduct),
    path("getproductbarcode",getProductBarcode),
    path("deleteproduct/<int:pk>",deleteProduct),
    path("createorder",createOrder),
    path("gethistoryorder",getHistoryOrder),
    path("updateproductimage/<int:pk>",putProduct),
    path("getsimilarproducts/<int:distinctId>",getSimilarProducts),
    path("getnewestproducts",getNewestProducts),
    path("getfirstproducts",getFirstProducts),
    path("getfavs",getFavorites),
    path("getshopproducts",getShopProducts),
  
    ]