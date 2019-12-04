# Copyright 2018 Expert exp-sa.com, Suliman Alsowelim (KACST)
{
    "name": "Umm Al Qura (Hijri) Datepicker",
    'version': '1',
    'author': 'Expert Ltd. Co., upgraded by Suliman Alsowelim (KACST)',
    "license": "LGPL-3",
    'summary': 'Web',
    "description":
        """
  - Umm Al Qura(Hijri) Datepicker, consistent with original odoo datepicker style (theme-able).\n
  - On-the-fly conversions between georgian and ummalqura calendars for datepicker and date fields.\n
  - This plugin overrides some default configuration for georgian odoo datepicker. Specifically, it override min/max dates and turning off showing the week number, to be consistent with hijri.\n
  - This plugin overrides arabic locale files for georgian calendars, to support only arabic-english numerical system (not arabic-hindi) if you want to cancel this override, you may comment all the code under controllers folder. \n 
  - There are limitations on the supported date-time formats. however, formats like (dd/mm/yyyy, mm/dd/yyyy) are supported. \n
  - Please see  ./static for the included open source codes and libraries.\n
  - Currently only supports arabic and english languages.\n
        """,
    "depends": ['base', 'web'],
    'category': 'web',
    'sequence': 5,
    'data': [
         "views/hijri_datepicker_templates.xml"
    ],
    'qweb' : [
        "static/src/xml/*.xml",
    ],
    'installable': True,
    'application': True,
}