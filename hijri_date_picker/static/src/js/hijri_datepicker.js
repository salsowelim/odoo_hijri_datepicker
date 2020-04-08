odoo.define('hijri_datepicker', function(require) {
  "use strict";
  var core = require('web.core');
  var datepicker = require('web.datepicker');
  var datetimefield = require('web.basic_fields');
  var time = require('web.time');
  datepicker.DateWidget.include({
    events: {},
    start: function() {
      this.$input = this.$('input.oe_datepicker_master');
      this.options['locale'] = moment.locale();
      this.options['calendarWeeks'] = false;
      this.options['minDate'] = moment("01/01/1900", "DD/MM/YYYY");
      this.options['maxDate'] = moment("21/06/2058", "DD/MM/YYYY"); // max hijri date.
      this.$input.datetimepicker(this.options);
      this.picker = this.$input.data('DateTimePicker');
      this.$input_hijri = this.$el.find('input.oe_hijri');
      this.hijri_old_val = '';
      var hijri_options = this.options;
      var custom_hijri_locale = moment.locale();
      if (custom_hijri_locale.indexOf("ar") !== -1) {
        custom_hijri_locale = "ar"
      }
      hijri_options['locale'] = {
        calender: 'ummalqura',
        lang: custom_hijri_locale
      };
      hijri_options['minDate'] = moment_hijri("28/08/1317", ["DD/MM/YYYY"], false).locale(hijri_options['locale']); // 01/01/1900
      hijri_options['maxDate'] = moment_hijri("30/12/1480", ["DD/MM/YYYY"], false).locale(hijri_options['locale']);
      var convert_to_hijri_on_init_value = false;
      if (hijri_options['defaultDate']) {
        convert_to_hijri_on_init_value = hijri_options['defaultDate'];
        delete hijri_options['defaultDate'];
      }
      // if default option is set, delete it and call changedatetime_hijri  (or trigger dp,change)
      this.$input_hijri.datetimepicker_hijri(hijri_options);
      this.hijri_picker = this.$input_hijri.data('DateTimePicker_hijri');
      this._setReadonly(false);
      this.$input.on("dp.show", () => this._onShow());
      this.$input.on("dp.change", () => this.changeDatetime());
      this.$input.on("change", () => this.changeDatetime());
      function disable_decades_view() {
        /* src http://jsfiddle.net/n22ybhw7/ */
        $(".datepicker-years .picker-switch").removeAttr('title')
          .css('cursor', 'default')
          .css('background', 'inherit')
          .on('click', function(e) {
            e.stopPropagation();
          });
      }
      this.$input_hijri.on("dp.change", () => this.changeDatetime_hijri());
      this.$input_hijri.on("change", () => this.changeDatetime_hijri());
      this.$input_hijri.on("dp.show", function() {
        disable_decades_view();
      });
      this.$input_hijri.on("dp.update", function() {
        disable_decades_view();
      });
      if (convert_to_hijri_on_init_value) {
        this.greg_to_hijri(convert_to_hijri_on_init_value);
      }
    },
    _setReadonly: function(readonly) {
      this.readonly = readonly;
      this.$input.prop('readonly', this.readonly);
      this.$input_hijri.prop('readonly', this.readonly);
    },
    hijri_to_greg: function() {
      if (this.hijri_old_val) {
        var cal_greg = $.calendars.instance('gregorian');
        var cal_hijri = $.calendars.instance('ummalqura', moment.locale());
        var moment_hijri_object = moment_hijri(this.$input_hijri.val(), this.get_current_format());
        var jd = cal_hijri.toJD(moment_hijri_object.year(), moment_hijri_object.month() + 1, moment_hijri_object.day());
        var gdate = cal_greg.fromJD(jd);
        moment_hijri_object._date = gdate;
        //moment_hijri_object._time = 
        moment_hijri_object.locale({
          calender: 'gregorian',
          lang: moment.locale()
        });
        this.$input.val(moment_hijri_object.format(this.get_current_format()));
      } else {
        this.$input.val('');
      }
      this._setValueFromUi();
      this.trigger("datetime_changed");
    },
    changeDatetime_hijri: function() {
      if (this.$input_hijri.val() != this.hijri_old_val) {
        this.hijri_old_val = this.$input_hijri.val();
        this.hijri_to_greg();
      }
    },
    changeDatetime: function() {
      if (this.isValid()) {
        var oldValue = this.getValue();
        this._setValueFromUi();
        var newValue = this.getValue();
        var hasChanged = !oldValue !== !newValue;
        if (oldValue && newValue) {
          var formattedOldValue = oldValue.format(time.getLangDatetimeFormat());
          var formattedNewValue = newValue.format(time.getLangDatetimeFormat())
          if (formattedNewValue !== formattedOldValue) {
            hasChanged = true;
          }
        }
        if (hasChanged) {
          // The condition is strangely written; this is because the
          // values can be false/undefined
          this.greg_to_hijri(this.getValue());
          this.trigger("datetime_changed");
        }
      }
    },
    greg_to_hijri: function(moment_value) {
      if (moment_value) { // if defined
        var cal_greg = $.calendars.instance('gregorian');
        var cal_hijri = $.calendars.instance('ummalqura', moment.locale());
        var moment_hijri_object = moment_hijri();
        moment_hijri_object.locale({
          calender: 'ummalqura',
          lang: moment.locale()
        });
        var jd = cal_greg.toJD(moment_value.year(), moment_value.month() + 1, moment_value.date());
        var date = cal_hijri.fromJD(jd);
        moment_hijri_object._date = date;
        moment_hijri_object.hour(moment_value.hour());
        moment_hijri_object.minute(moment_value.minute());
        moment_hijri_object.second(moment_value.second());
        this.$input_hijri.val(moment_hijri_object.format(this.get_current_format()));
      } else {
        this.$input_hijri.val("");
      }
    },
    destroy: function() {
      this.picker.destroy();
      this.hijri_picker.destroy();
      this._super.apply(this, arguments);
    },
    get_current_format: function() {
      if (this.type_of_date == 'datetime') {
        return time.getLangDatetimeFormat();
      }
      if (this.type_of_date == 'date') {
        return time.getLangDateFormat();
      }
    },

  });

  datetimefield.FieldDate.include({
    start: function() {
      this._super();
      if (this.mode === 'readonly') {
        var hij_date = this.convert_greg_to_hijri(this.value);
        this.$el.append("<div><span class='oe_hijri'>" + hij_date + "</span></div>");
      }
      //return $.when(def, this._super.apply(this, arguments));
      return true;
    },
    reset: function(record, event) {
      this._super(record, event);
      var hij_date = this.convert_greg_to_hijri(this.value);
      if (this.mode === 'readonly') {
        if (this.$el.find('span.oe_hijri').length) {
          this.$el.find('span.oe_hijri').text(hij_date);
        } else {
          this.$el.append("<div><span class='oe_hijri'>" + hij_date + "</span></div>");
        }
      }
    },

    convert_greg_to_hijri: function(moment_value) {
      if (moment_value) {
        var custom_hijri_locale = moment.locale();
        if (custom_hijri_locale.indexOf("ar") !== -1) {
          custom_hijri_locale = "ar"
        }
        var cal_greg = $.calendars.instance('gregorian');
        var cal_hijri = $.calendars.instance('ummalqura', custom_hijri_locale);
        var moment_hijri_object = moment_hijri();
        moment_hijri_object.locale({
          calender: 'ummalqura',
          lang: custom_hijri_locale
        });
        var jd = cal_greg.toJD(moment_value.year(), moment_value.month() + 1, moment_value.date());
        var date = cal_hijri.fromJD(jd);
        moment_hijri_object._date = date;
        return moment_hijri_object.format(time.getLangDateFormat());
      }
    },
  });
});