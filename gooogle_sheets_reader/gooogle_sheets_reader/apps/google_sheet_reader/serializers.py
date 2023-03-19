from rest_framework import serializers
from .models import Sheet

class SheetSerializer(serializers.ModelSerializer):
    format_delivery_date = serializers.CharField(source='get_format_delivery_date', read_only=True)

    class Meta:
        model = Sheet
        fields = ('pk', 'pos_index', 'order', 'price_usd', 'price_rub', 'format_delivery_date', )