Ext.ns('nls');
Ext.ns('nls.msg');
Ext.ns('nls.picker');
Ext.ns('nls.month');
Ext.ns('nls.day');

if(window.navigator.language){
	nls.language = window.navigator.language.substr(0, 2);
}
if(window.navigator.userLanguage){
	nls.language = window.navigator.userLanguage.substr(0,2);
}

nls.msg.en = {
		yesButton: 'OK',
		noButton: 'No',
		cancelButton: 'Cancel',
		okButton: 'OK'
};

nls.msg.de = {
		yesButton: 'OK',
		noButton: 'Nein',
		cancelButton: 'Abbrechen',
		okButton: 'OK'
};

nls.msg.it = {
		yesButton: 'Sì',
		noButton: 'No',
		cancelButton: 'Annullare',
		okButton: 'OK'
};

nls.msg.fr = {
		yesButton: 'Oui',
		noButton: 'Non',
		cancelButton: 'Annuler',
		okButton: 'OK'
};

nls.msg.nl = {
		yesButton: 'OK',
		noButton: 'Nee',
		cancelButton: 'Annuleren',
		okButton: 'OK'
};

nls.msg.es = {
		yesButton: 'Si',
		noButton: 'No',
		cancelButton: 'Cancelar',
		okButton: 'Ok'
};

nls.msg.fi = {
		yesButton: 'Jos',
		noButton: 'Ei',
		cancelButton: 'Peruuttaa',
		okButton: 'Ok'
};
if (!nls.msg[nls.language]){
	nls.language = 'en';
}
Ext.apply(nls.msg, nls.msg[nls.language]);

nls.picker.en = {
		doneButton :'OK',
		cancelButton: 'Cancel'
};

nls.picker.de = {
		doneButton: 'OK',
		cancelButton: 'Abbrechen'
};

nls.picker.it = {
		doneButton: 'OK',
		cancelButton: 'Annullare'
};

nls.picker.fr = {
		doneButton: 'OK',
		cancelButton: 'Annuler'
};

nls.picker.nl = {
		doneButton: 'OK',
		cancelButton: 'Annuleren'
};

nls.picker.es = {
		doneButton : 'OK',
		cancelButton: 'Cancelar'
};

nls.picker.fi = {
		doneButton : 'OK',
		cancelButton: 'Peruuttaa'
};
if (!nls.picker[nls.language]){
	nls.language = 'en';
}
Ext.apply(nls.picker, nls.picker[nls.language]);

nls.day.en = {
		1: "Sun",
        2: "Mon",
        3: "Tue",
        4: "Wed",
        5: "Thu",
        6: "Fri",
        7: "Sat"
};

nls.day.de = {
		1: "So",
        2: "Mo",
        3: "Di",
        4: "Mi",
        5: "Do",
        6: "Fr",
        7: "Sa"
};

nls.day.it = {
		1: "Dom",
        2: "Lun",
        3: "Mar",
        4: "Mer",
        5: "Gio",
        6: "Ven",
        7: "Sab"
};

nls.day.fr = {
		1: "di",
        2: "lu",
        3: "ma",
        4: "me",
        5: "je",
        6: "ve",
        7: "sa"
};

nls.day.nl = {
		1: "Zo",
        2: "Ma",
        3: "Di",
        4: "Woe",
        5: "Do",
        6: "Vrij",
        7: "Za"
};

nls.day.es = {
		1: "Dom",
  		2: "Lun",
  		3: "Mar",
  		4: "Mier",
 		5: "Jue",
 		6: "Vie",
 		7: "Sab"
};

nls.day.fi = {
		1: "Su",
  		2: "Ma",
  		3: "Ti",
  		4: "Ke",
 		5: "To",
 		6: "Pe",
 		7: "La"
};
if (!nls.day[nls.language]){
	nls.language = 'en';
}
Ext.apply(nls.day, nls.day[nls.language]);

nls.month.en = {
		1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"	
};

nls.month.de = {
		1: "Januar",
        2: "Februar",
        3: "März",
        4: "April",
        5: "Mai",
        6: "Juni",
        7: "Juli",
        8: "August",
        9: "September",
        10: "Oktober",
        11: "November",
        12: "Dezember"	
};

nls.month.it = {
		1: "gennaio",
        2: "febbraio",
        3: "marzo",
        4: "aprile",
        5: "maggio",
        6: "giugno",
        7: "luglio",
        8: "agosto",
        9: "settembre",
        10: "ottobre",
        11: "novembre",
        12: "dicembre"	
};

nls.month.fr = {
		1: "janvier",
        2: "février",
        3: "mars",
        4: "avril",
        5: "mai",
        6: "juin",
        7: "juillet",
        8: "août",
        9: "septembre",
        10: "octobre",
        11: "novembre",
        12: "décembre"	
};

nls.month.nl = {
		1: "januari",
        2: "februari",
        3: "maart",
        4: "april",
        5: "mei",
        6: "juni",
        7: "juli",
        8: "augustus",
        9: "september",
        10: "oktober",
        11: "november",
        12: "december"	
};

nls.month.es = {
		1: "Enero",
   		2: "Febrero",
   		3: "Marzo",
   		4: "Abril",
   		5: "Mayo",
   		6: "Junio",
   		7: "Julio",
   		8: "Agosto",
   		9: "Septiembre",
   		10: "Octubre",
   		11: "Noviembre",
   		12: "Diciembre"	
};

nls.month.fi = {
		1: "Tammikuu",
   		2: "Helmikuu",
   		3: "Maaliskuu",
   		4: "Huhtikuu",
   		5: "Toukokuu",
   		6: "Kesäkuu",
   		7: "Heinäkuu",
   		8: "Elokuu",
   		9: "Syyskuu",
   		10: "Lokakuu",
   		11: "Marraskuu",
   		12: "Joulukuu"	
};
if (!nls.month[nls.language]){
	nls.language = 'en';
}
Ext.apply(nls.month, nls.month[nls.language]);