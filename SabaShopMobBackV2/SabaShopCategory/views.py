from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import Category,Category2
from .serializers import Cat1Serializer,Cat2Serializer
# Create your views here.

# * ------------------------------------- Category 1 -----------------------------------
@api_view(["GET"])
def getCategory(request):
    # cats = Category.objects.all()
    cats = Category.objects.all()
    CSER = Cat1Serializer(cats,many=True)
    return Response(CSER.data,status=status.HTTP_200_OK)




@api_view(["POST"])
def createcategory(request):
    cats = request.data
    CSER = Cat1Serializer(data=request.data)
    if CSER.is_valid():
        CSER.save()
        return Response(CSER.data,status=status.HTTP_200_OK)
    else:
        return Response({"message":CSER.errors},status=status.HTTP_400_BAD_REQUEST)


# @api_view(["DELETE"])
# def getCategory(request):
#     cats = Category.objects.all()
#     CSER = Cat1Serializer(cats,many=True)
#     return Response(CSER.data,status=status.HTTP_200_OK)

# @api_view(["PUT"])
# def getCategory(request):
#     cats = Category.objects.all()
#     CSER = Cat1Serializer(cats,many=True)
#     return Response(CSER.data,status=status.HTTP_200_OK)

@api_view(["PUT"])
def updateCat1(request,pk):
    cat1s = Category.objects.get(id=pk)
    C1SER = Cat1Serializer(instance=cat1s,data=request.data)
    if C1SER.is_valid():
        C1SER.save()
        return Response(C1SER.data,status=status.HTTP_200_OK)
    print(C1SER.errors)
    return Response({"error":"ثبت تصویر با خطا مواجه شد"},status=status.HTTP_400_BAD_REQUEST)



# * ------------------------------------- Category 2 -----------------------------------
@api_view(["GET"])
def getCategory2(request):
    cat2s = Category2.objects.all()
    C2SER = Cat2Serializer(cat2s,many=True)
    return Response(C2SER.data,status=status.HTTP_200_OK)


@api_view(["PUT"])
def updateCat2(request,pk):
    cat2s = Category2.objects.get(id=pk)
    C2SER = Cat2Serializer(instance=cat2s,data=request.data)
    if C2SER.is_valid():
        C2SER.save()
        return Response(C2SER.data,status=status.HTTP_200_OK)
    return Response({"error":"ثبت تصویر با خطا مواجه شد"},status=status.HTTP_400_BAD_REQUEST)
