Ext.ns('wcli');

/*cmfirst.Time = (function() {
	function _esc(str) {
		return str.replace(/ /g, "_");
	}
	
	function Time() {
		
	}
	
	Ext.apply(Time.prototype, {
		fieldTime: function(id){
			
		}
	});
	
	return new Time();
})();*/

wcli.Time = function(value){
	if (nls.language === "en" || nls.language === "es-MX") {
		if (value == ""){
			return value = "12:00 AM";
		}
		value = value.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [value];

		 if (value.length > 1) { 
			value = value.slice (1);  
		 	value[5] = +value[0] < 12 ? ' AM' : ' PM';
		 	if (value[0] > 12) {
		 		value[0] = +value[0] % 12 || 12; 
		 	}
		 	value.splice(3,1);
		 }

		 return value.join (''); 
		 
	} else if (nls.language === "fi" || nls.language === "de" || nls.language === "it" || nls.language === "fr" || nls.language === "nl" || nls.language === "es"){
		if (value == ""){
			return value = "00:00";
		}
		var hours = parseInt(value.substr(0, 2));
	    if((value.indexOf('am') != -1 || value.indexOf('AM') != -1) && hours == 12) {
	    	value = value.replace('12', '00');
	    }
	    if((value.indexOf('pm') != -1 || value.indexOf('PM') != -1) && hours < 12) {
	    	value = value.replace(value.substr(0, 2), (hours + 12));
	    }
	    
	    value = value.replace(/(am|pm|AM|PM)/, '');
	    value = value.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/).slice(1);
	    value.splice(3,1);
	    return value.join ('');
	} else {
		return value;
	}

}

wcli.ChangeTime = function(value){
	if (nls.language === "en" || nls.language === "es-MX"){
		if (value.length === 1) {
			if (/^([0-1]?[0-9])?$/.test(value) === false){
				value = value.slice(0, -1);
			}
		} else if (value.length === 2 && value.indexOf(":") === -1 && window._preValue && window._preValue.indexOf(":") === -1) {
			if (/^(0[0-9]|1[0-2])?$/.test(value) === false){
				value = value.slice(0, -1);
			}else{
				value += ":";
			}
		} else if (value.length === 2 && value.indexOf(":") != -1) {
			value = "0" + value;
		} else if (value.length === 4 ){
			if (/^([0-1]?[0-9]):([0-5])?$/.test(value) === false) {
				value = value.slice(0, -1);
			}
		} else if (value.length === 5){
			if (/^([0-1]?[0-9]):([0-5][0-9])?$/.test(value) === false) {
				value = value.slice(0, -1);
			}
		} else if (value.length === 6 ){
			if (/^([0-1]?[0-9]):([0-5][0-9])(A|a|P|p)?$/.test(value) === false && /^([0-1]?[0-9]):([0-5][0-9])\s?$/.test(value) === false) {
				value = value.slice(0, -1);
			}else{
				if (value.charAt(5) === "a" || value.charAt(5) === "A"){
					value = value.replace(value.charAt(5), ' AM');
				}else if (value.charAt(5) === "p" || value.charAt(5) === "P"){
					value = value.replace(value.charAt(5), ' PM');
				}
			}
		}  else if (value.length === 7 && window._preValue && window._preValue.indexOf("a") === -1 && window._preValue.indexOf("A") === -1 && window._preValue.indexOf("p") === -1 && window._preValue.indexOf("P") === -1){
			if (/^([0-1]?[0-9]):([0-5][0-9])\s?(A|a|P|p)?$/.test(value) === false) {
				value = value.slice(0, -1);
			}else{
				if (value.charAt(6) === "a" || value.charAt(6) === "A"){
					value = value.replace(value.charAt(6), 'AM');
				}else{
					value = value.replace(value.charAt(6), 'PM');
				}
			}
		} else if (value.length === 9){
			value = value.slice(0, -1);
		}
	} else if (nls.language === "fi" || nls.language === "de" || nls.language === "it" || nls.language === "fr" || nls.language === "nl" || nls.language === "es"){
		if (value.length === 1) {
			if (/^([0-2]?[0-9])?$/.test(value) === false){
				value = value.slice(0, -1);
			}
		} else if (value.length === 2 && value.indexOf(":") === -1 && window._preValue && window._preValue.indexOf(":") === -1) {
			if (value.charAt(0) === "2"){
				if (/^([2]?[0-3])?$/.test(value) === false){
					value = value.slice(0, -1);
				} else {
					value += ":";
				}
			}else if (/^([0-1]?[0-9])?$/.test(value) === false){
				value = value.slice(0, -1);
			} else {
				value += ":";
			}
		} else if (value.length === 2 && value.indexOf(":") != -1) {
			value = "0" + value;
		} else if (value.length === 4 ){
			if (/^([0-2]?[0-9]):([0-5])?$/.test(value) === false) {
				value = value.slice(0, -1);
			}
		} else if (value.length === 5){
			if (/^([0-2]?[0-9]):([0-5][0-9])?$/.test(value) === false) {
				value = value.slice(0, -1);
			}
		} else if (value.length === 6){
			value = value.slice(0, -1);
		}
	}
	
	window._preValue = value;
	return value;
	
}


wcli.checkFormat = function(value, originalValue){
	if (nls.language === "en" || nls.language === "es-MX"){
		if (/^([0-1]?[0-9]):([0-5][0-9])\s?(AM|am|PM|pm)?$/.test(value) === false || value.length < 8) {
			if (originalValue) {
				value = originalValue;
			} else {
				value = "12:00 AM";
			}
			
		}
	} else if (nls.language === "fi" || nls.language === "de" || nls.language === "it" || nls.language === "fr" || nls.language === "nl" || nls.language === "es"){
		if (/^([0-2]?[0-9]):([0-5][0-9])?$/.test(value) === false || value.length <= 3) {
			if (originalValue) {
				value = originalValue;
			} else {
				value = "00:00";
			}
		}
	}
	return value;
}