# Django imports.
from django.urls import re_path

# google_sheet_reader application imports.
from . import views

# Specifies the app name for name spacing.
app_name = 'google_sheet_reader'

# google_sheet_reader/urls.py
urlpatterns = [

    # /api/sheet/
    re_path(
            route=r'^api/sheet/$',
            view=views.sheet_list,
    ),
]