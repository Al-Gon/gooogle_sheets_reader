# Django imports.
from django.conf import settings
from django.db.utils import IntegrityError

# other imports
from googleapiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials
from urllib.request import urlopen
from xml.etree import ElementTree as etree
from datetime import datetime
from google_sheet_reader.models import *
import time
import pytz
import threading

# google_sheet_reader application imports.
from google_sheet_reader.reader_settings import *


def get_service(api_name, api_version, scopes, key_file_location):
    """Get a service that communicates to a Google API.
    Returns:
        A service that is connected to the specified API.
    """

    credentials = ServiceAccountCredentials.from_json_keyfile_name(
            key_file_location, scopes=scopes)

    # Build the service object.
    service_obj = build(api_name, api_version, credentials=credentials)

    return service_obj

def get_usd_rate():
    """Gets the current dollar exchange rate from the website www.cbr.ru
    Returns:
        float value of rate.
    """

    with urlopen("https://www.cbr.ru/scripts/XML_daily.asp", timeout=10) as f:
        usd_rate = etree.parse(f).findtext('.//Valute[@ID="R01235"]/Value')
    return float(usd_rate.replace(',', '.'))


def get_sheet_rows(service_obj, spreadsheet_id, ranges):
    """Get data from google sheet.
    Returns:
        List of sheet rows.
    """

    results = service_obj.spreadsheets().values().batchGet(spreadsheetId=spreadsheet_id,
                                                           ranges=ranges,
                                                           valueRenderOption='FORMATTED_VALUE',
                                                           dateTimeRenderOption='FORMATTED_STRING').execute()
    sheet_rows = results['valueRanges'][0]['values']

    return sheet_rows

def prepare_rows_values(sheet_rows):
    """Processes data uploaded from google sheet.
    Each row in sheet must consists from 4 values.
    Returns:
        List of tuples.
    """

    def get_price_rub(price_usd):
        """Calculates the price in rubles.
        Here it is assumed that the value of price in usd from google sheet must be
        string displays integer value, not float.
        """

        usd_rate = get_usd_rate()
        return str(round(int(price_usd) * usd_rate, 2)).replace('.', ',')

    def get_datetime_format(string):
        """Сonverts date string to an object Datetime
        with attribute time zone.
        """

        tz = pytz.timezone(settings.TIME_ZONE)
        date = datetime.strptime(string, "%d.%m.%Y")
        date = date.replace(tzinfo=tz)
        return date

    sheet_rows = [tuple([int(row[0])] + row[1:3] + [get_price_rub(row[2])] + [get_datetime_format(row[3])])
                  for row in sheet_rows if len(row) == 4]

    return sheet_rows


def update_sheet_rows():
    """Updates the values in the database table.
    Here it is assumed that the 'pos_index'(item number in google sheet) must be unique.
    """

    sheet_rows = Sheet.objects.all().values_list('pos_index', 'order', 'price_usd', 'price_rub', 'delivery_date')

    while True:

        service = get_service(api_name='sheets',
                              api_version='v4',
                              scopes=SCOPES,
                              key_file_location=CREDENTIALS_FILE)

        new_sheet_rows = get_sheet_rows(service_obj=service,
                                        spreadsheet_id=SPREADSHEET_ID,
                                        ranges=RANGES)

        new_sheet_rows = prepare_rows_values(new_sheet_rows)

        update_rows, new_rows, del_rows = [], [], []
        max_index = len(new_sheet_rows)

        if len(sheet_rows) > len(new_sheet_rows):
            del_rows = sheet_rows[len(new_sheet_rows):]

        if len(sheet_rows) < len(new_sheet_rows):
            new_rows = new_sheet_rows[len(sheet_rows):]
            max_index = len(sheet_rows)

        for i in range(max_index):
            row = new_sheet_rows[i]
            for j in range(len(row)):
                if sheet_rows[i][j] != row[j]:
                    update_rows.append((row, sheet_rows[i]))
                    break

        if update_rows:
            for i in range(len(update_rows)):
                pos_index, order, price_usd, price_rub, delivery_date = update_rows[i][0]
                pos_index_, order_, price_usd_, price_rub_, delivery_date_ = update_rows[i][1]
                try:
                    Sheet.objects.filter(
                        pos_index=pos_index_,
                        order=order_,
                        price_usd=price_usd_,
                        price_rub=price_rub_,
                        delivery_date=delivery_date_
                    ).update(
                        pos_index=pos_index,
                        order=order,
                        price_usd=price_usd,
                        price_rub=price_rub,
                        delivery_date=delivery_date
                    )
                except IntegrityError:
                    print(f'Повторяющееся значение поля pos_index={pos_index}')


        if new_sheet_rows:
            for row in new_rows:
                pos_index, order, price_usd, price_rub, delivery_date = row
                try:
                    sheet = Sheet.objects.create(
                                 pos_index=pos_index,
                                 order=order,
                                 price_usd=price_usd,
                                 price_rub=price_rub,
                                 delivery_date=delivery_date)
                    sheet.save()
                except IntegrityError:
                    print(f'Повторяющееся значение поля pos_index={pos_index}')

        if del_rows:
            for row in del_rows:
                pos_index, order, price_usd, price_rub, delivery_date = row
                Sheet.objects.filter(
                    pos_index=pos_index,
                    order=order,
                    price_usd=price_usd,
                    price_rub=price_rub,
                    delivery_date=delivery_date
                ).delete()

        sheet_rows = new_sheet_rows
        time.sleep(3000)


def run_thread():
    thread = threading.Thread(target=update_sheet_rows)
    thread.start()