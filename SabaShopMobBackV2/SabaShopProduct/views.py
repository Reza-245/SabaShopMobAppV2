import os
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.db import connection
from utils.numberConverter import numberConverter
from utils.unicodeConverter import unicodeConverter
from .models import Order, Product
from .serializers import ProductImageSerializer, ProductSerializer,OrderSerializer,HistoryOrderSerializer
# Create your views here.
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.conf import settings
# @api_view(["GET"])
# def getProductSearch(request,query): 
#     products = Product.objects.filter(Q(name__contains = query) | Q(description1__contains = query) | Q(description2__contains = query)).all()
#     PSER = ProductSerializer(products,many=True)
#     return Response(PSER.data,status=status.HTTP_200_OK)

# from django.db import connection

# cursor = connection.cursor()

# @api_view(["GET"])
# def getProduct(request,groupid=0,groupid2=0):
#     # cursor.execute("call precedure name")
#     # prcs =  cursor.fetchall()
#     q = request.GET.get("q")
#     if q:
#         query = unicodeConverter(q)
#         # products = Product.objects.filter(idanbar=1,stut=0,unam__contains=query).all()[:100]
#         products = Product.objects.raw(f"exec queries @st=1,@unam={query}")
#     else:
#         if groupid2:
#             # products = Product.objects.filter(groupid=groupid,groupid2=groupid2,idanbar=1,stut=0).order_by("unam").all()[:100]
#             products = Product.objects.raw(f"exec queries @st=4,@unam={query},@groupid={groupid},@groupid2={groupid2}, @idanbar=1,@stut=0")
          
#         elif groupid:
#             # products = Product.objects.filter(groupid=groupid,idanbar=1,stut=0).order_by("unam").all()[:100]

#             products = Product.objects.raw(f"exec queries @st=5,@unam={query},@groupid={groupid}, @idanbar=1,@stut=0")

#         else:
#             #  products = Product.objects.order_by("unam").all()[:100]
#              Product.objects.raw("exec queries @st=6")
#     PSER = ProductSerializer(products,many=True)
#     return Response(PSER.data,status=status.HTTP_200_OK)

@api_view(["GET"])
def getProduct(request,groupid=0,groupid2=0):
    # cursor.execute("call precedure name")
    # prcs =  cursor.fetchall()
    q = request.GET.get("q")

    if q:
        # query = unicodeConverter(q)
        # products = Product.objects.filter(idanbar=1,stut=0,unam__contains=query).all()[:100]
        products = Product.objects.raw(f"exec queries @st=1,@unam={q}")
    else:
        if groupid2:
            # products = Product.objects.filter(groupid=groupid,groupid2=groupid2,idanbar=1,stut=0).order_by("unam").all()[:100]
            products = Product.objects.raw(f"exec queries @st=9,@idgroup={groupid},@idgroup2={groupid2}")
        elif groupid:
            # products = Product.objects.filter(groupid=groupid,idanbar=1,stut=0).order_by("unam").all()[:100]
            products = Product.objects.raw(f"exec queries @st=4,@idgroup={groupid}")

        else:
            #  products = Product.objects.order_by("unam").all()[:100]
            products = Product.objects.raw(f"exec queries @st=1")

    PSER = ProductSerializer(products,many=True)
    return Response(PSER.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def getProductBarcode(request):
    q = request.GET.get("q")
    # products = Product.objects.filter(barcod__exact=q).all()[:100]
    Englishlized_number = numberConverter(q)
    print(q)
    print(Englishlized_number)
    products = Product.objects.raw(f"exec queries @st=3,@barcod={Englishlized_number}")
    PSER = ProductSerializer(products,many=True)
    return Response(PSER.data,status=status.HTTP_200_OK)








@api_view(["GET"])
def getHistoryOrder(request):
    return Response([],status=status.HTTP_200_OK)
    history = Order.objects.all()
    if history:
        HSER = HistoryOrderSerializer(history,many=True)
        return Response(HSER.data,status=status.HTTP_200_OK)
    else:
        return Response([],status=status.HTTP_200_OK)



@api_view(["POST"])
def createOrder(request):
    OSER = OrderSerializer(data=request.data,many=True)
    if OSER.is_valid():
        cursor = connection.cursor()
        for data in OSER.data:
            order = data
            cod = order.get("cod")
            iduser = order.get("iduser")
            numb = order.get("numb")
            idcast = order.get("idcast")
            product = Product.objects.get(id=cod)
            query = f"exec add_to_prctmp @cod={cod}, @numb={numb},@price={product.price}, @box={product.box}, @iduser={iduser} , @mainid={product.mainid}, @idcast={idcast} ,@idanbar={product.idanbar}"
            cursor.execute(query)
        cursor.close()   
        return Response(
            {"message":"ok"},status=status.HTTP_200_OK)
    else:
        print(OSER.errors)
        return Response({"error":"مشکلی در ثبت سبد به وجود آمد"},status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def deleteProduct(request,pk):
    try:
        Product.objects.filter(id=pk).first().delete()
        return Response({"message":"محصول با موفقیت حذف شد"},status=status.HTTP_200_OK)
    except:
        return Response({"error":"حذف محصول با خطا مواجه شد"},status=status.HTTP_400_BAD_REQUEST)

        


@api_view(["PUT"])
def putProduct(request,pk):
    product = Product.objects.get(id=pk)
    PSER = ProductImageSerializer(instance=product,data=request.data)
    if PSER.is_valid():
        PSER.save()
        # cursor = connection.cursor()
        # idprc = PSER.data.get("id")
        # data = request.FILES['pic_path']
        # path = default_storage.save(f'products/{data.name}', ContentFile(data.read()))
        # os.path.join(settings.MEDIA_ROOT, path)
        # query = f"exec queries @st=8, @pic_path=N'products/{data.name}', @idprc={idprc}"
        # cursor.execute(query)
        # cursor.close() 
        # PSER.data["pic_path"] = path
        return Response(PSER.data,status=status.HTTP_200_OK)
    return Response({"error":"ثبت تصویر با خطا مواجه شد"},status=status.HTTP_400_BAD_REQUEST) 
