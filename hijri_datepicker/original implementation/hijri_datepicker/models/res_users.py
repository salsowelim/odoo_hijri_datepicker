from odoo import models, fields, api, _

class res_users(models.Model):
    _inherit = 'res.users'

    cal_localise = fields.Selection([('ar','Arabic'),('fa','Farsi')],'Calendar Localisation')

    @api.multi
    def get_localisation(self):
        res_lang_obj = self.env['res.lang']
        lang_ids = res_lang_obj.search([('code','=',self.lang)])
        date_format = '%m/%d/%Y'
        if lang_ids:
            date_format = lang_ids[0].date_format
        return {
            'lang':self.cal_localise or '',
            'date_format': date_format
        }