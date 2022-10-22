from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from SabaShopProduct.models import Product
from SabaShopProduct.serializers import ProductSerializer
from SabaShopUser.models import CustomerUser, SUser,UserSetting
from SabaShopUser.serializers import CustomerUserSerializer, SUserSerializer,UserSettingSerailizer
from utils.unicodeConverter import unicodeConverter
# Create your views here.
import requests





@api_view(["GET"])
def checkConnection(request):
    return Response(status=status.HTTP_200_OK)





# @api_view(["POST"])
# def loginShop(request):
#     U_SER = SUserSerializer(data=request.data)
#     if U_SER.is_valid():
#         password = U_SER.data.get("password")
#         nam = U_SER.data.get("nam")
#         # user = SUser.objects.filter(nam = U_SER.data.get("nam"),password=U_SER.data.get("password"),idprofile=14).first()
#         user = SUser.objects.raw(f"exec queries @st=7, @pass={password},@nam={nam}")
#         if user:
#             SUSER_SER = SUserSerializer(data=user,many=True)
#             SUSER_SER.is_valid()
#             return Response(SUSER_SER.data[0],status=status.HTTP_200_OK)
#         else:
#             return Response({"error":"نام کابری یا گذرواژه صحیح نیست"},status=status.HTTP_404_NOT_FOUND)
#     else:
#         return Response({"error":"نام کابری یا گذرواژه صحیح نیست"},status=status.HTTP_404_NOT_FOUND)
        


@api_view(["POST"])
def loginShop(request):
    CER = CustomerUserSerializer(data=request.data)
    if CER.is_valid():
        customer = CustomerUser.objects.filter(tel=request.data.get("tel")).first()
        if customer:
            if customer.is_valid:
                return Response(CustomerUserSerializer(customer).data,status=status.HTTP_200_OK)
            else:
                return Response({"message":"تا پایان تاییدیه از سمت کارشناسان لطفا منتظر بمانید"},status=status.HTTP_204_NO_CONTENT)
        else:
            CER.save()
            return Response({"message":"تا پایان تاییدیه از سمت کارشناسان لطفا منتظر بمانید"},status=status.HTTP_201_CREATED)
    return Response(CER.errors,status=status.HTTP_400_BAD_REQUEST)







@api_view(["GET"])
def getUserSetting(request):
    usersetting = UserSetting.objects.first()
    U_SER = UserSettingSerailizer(usersetting)
    return Response(U_SER.data,status=status.HTTP_200_OK)



@api_view(["GET"])
def getCustomers(request):
    q = request.GET.get("q")
    if q:
        # customers = CustomerUser.objects.filter(unam__contains=query , idkol=1).all()
        customers = CustomerUser.objects.raw(f"exec queries @st=2,@unam={q}")
    else:
        # customers = CustomerUser.objects.filter(idkol=1).all()
        customers = CustomerUser.objects.raw("exec queries @st=2,@unam=''")
    CSER = CustomerUserSerializer(customers,many=True)
    return Response(CSER.data,status=status.HTTP_200_OK)

# @api_view(["DELETE"])
# def deleteProduct(request,pk):
#     try:
#         Product.objects.filter(id=pk).first().delete()
#         return Response({"message":"محصول با موفقیت حذف شد"},status=status.HTTP_200_OK)
#     except:
#         return Response({"error":"حذف محصول با موفقیت انجام شد"},status=status.HTTP_400_BAD_REQUEST)

        


# @api_view(["PUT"])
# def putProduct(request):
#     pass
# * Sending SMS ----------------------------------------->
BaseAddress = "http://www.payamak.vip/api/v1/RestWebApi/"


@api_view(['POST'])
def sendmessage(request):
    smsCode = request.data.get("codeContent")
    url=BaseAddress+'SendBatchSms'
    data={'userName': "mc.09332951900" ,
          'password': "rnk$980",
          'fromNumber':'10009611',
          'toNumbers':request.data.get("mobileNumber"),
          'messageContent':f"کد بازیابی شما برای ورود : {smsCode}",
          'isFlash':False,
          'sendDelay':0
          }
    response = requests.post(url,json=data,headers={"Content-Type": "application/json"})
    return Response({"message":"ok"}, status=status.HTTP_200_OK)
