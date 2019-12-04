/* http://keith-wood.name/calendars.html
   Arabic localisation for UmmAlQura calendar for jQuery v2.0.0.
   Written by Amro Osama March 2013. */
/*
Patched by: Suliman Alsowelim
-Renaming.
-change the first day of the week.
*/
(function($) {
  $.calendars.calendars.ummalqura.prototype.regionalOptions['ar'] = {
    name: 'UmmAlQura', // The calendar name
    epochs: ['BAM', 'AM'],
    monthNames: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأول', 'جمادى الآخر', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
    monthNamesShort: ['محرم', 'صفر', 'ر الأول', 'ر الثاني', 'ج الأول', 'ج الآخر', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
    dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    dayNamesShort: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
    dateFormat: 'yyyy/mm/dd', // See format options on BaseCalendar.formatDate
    firstDay: 1, // The first day of the week, Sat = 0, Sun = 1, ...
    isRTL: true // True if right-to-left language, false if left-to-right
  };
})(jQuery);
