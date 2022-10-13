from django.urls import path
from SabaShopUser.views import loginShop,getCustomers,getUserSetting,checkConnection
urlpatterns=[path("loginshop",loginShop),path("getcustomers",getCustomers),path("getusersetting",getUserSetting),path("checkconnection",checkConnection)]