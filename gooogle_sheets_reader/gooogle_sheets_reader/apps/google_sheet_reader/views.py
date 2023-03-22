from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .utils import run_upload


# Create your views here.

@api_view(['GET'])
def sheet_list(request):
    if request.method == 'GET':
        run_upload()
        data = Sheet.objects.all()
        serializer = SheetSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)