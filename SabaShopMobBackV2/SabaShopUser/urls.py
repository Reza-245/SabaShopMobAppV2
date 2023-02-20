from django.urls import path
from SabaShopUser.views import loginShop,getCustomers,getUserSetting,checkConnection,sendmessage,sendConfirmMessage
urlpatterns=[
path("loginshop",loginShop),
path("getcustomers",getCustomers),
path("getusersetting",getUserSetting),
path("checkconnection",checkConnection),
path("sendsabasms",sendmessage),
path("sendsms/<str:number>",sendConfirmMessage)
]