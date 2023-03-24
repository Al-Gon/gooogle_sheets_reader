from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from .utils import run_upload, set_stop_event, create_event


# Create your views here.

@api_view(['GET'])
def sheet_list(request):
    if request.method == 'GET':
        #run_upload()
        data = Sheet.objects.all()
        serializer = SheetSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def sync_toggle(request):
    data = {}
    new_post = request.data['sync_toggle']

    if new_post == 'start':
        data['reply'] = 'Синхронизация включена.'
        event = create_event()
        run_upload(event)
    elif new_post == 'stop':
        data['reply'] = 'Синхронизация выключена.'
        set_stop_event()

    return Response(data)