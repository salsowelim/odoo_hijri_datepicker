# Copyright 2018 Expert exp-sa.com
{
    "name": "Umm Al Qura(Hijri) Datepicker",
    'version': '11.1',
    'author': 'Expert Ltd. Co.',
    'summary': 'Web',
    "description":
        """
        Odoo Web Displays Umm Al Qura(Hijri) Datepicker.
        =======================================================
        """,
    'website': 'www.exp-sa.com',
    "depends": ['base', 'web'],
    'category': 'web',
    'sequence': 5,
    'data': [
         "views/res_users_view.xml",
         "views/hijri_datepicker_templates.xml"
    ],
    'qweb' : [
        "static/src/xml/*.xml",
    ],
    'currency':'SAR',
    'price':'300.0',
    'images': ['images/1.jpg'],
    'installable': True,
    'application': True,
}