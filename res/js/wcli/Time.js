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

Ext.define('Ext.ux.picker.Time', {
    extend: 'Ext.picker.Picker',
    xtype: 'timepicker',
    alternateClassName: 'Ext.TimePicker',
    requires: [ 'Ext.DateExtras' ],
    config: {
        /**
         * @cfg {String} hourText
         * The label to show for the hour column.
         * @accessor
         */
	    hourText: 'Hour',
	    /**
         * @cfg {String} minuteText
         * The label to show for the minute column.
         * @accessor
         */
	    minuteText: 'Minute',
	    /**
         * @cfg {String} secondText
         * The label to show for the seconds column.
         * @accessor
         */
	    secondText: 'Seconds',
	    /**
         * @cfg {String} millisecondText
         * The label to show for the millisecond column.
         * @accessor
         */
	    millisecondText: 'Milliseconds',
	    /**
         * @cfg {String} meridiemText
         * The label to show for the meridiem column.
         * @accessor
         */
	    meridiemText: 'AM/PM',
	    /**
         * @cfg {String} AMText
         * The text to use for the ante-meridiem.
         * @accessor
         */
        AMText: 'AM',
        /**
         * @cfg {String} PMText
         * The text to use for the post-meridiem.
         * @accessor
         */
        PMText: 'PM',
        /**
         * @cfg {Number} startHour
         * The start hour for the time picker. If meridiem is specified in the {@link #slotOrder}, 
         * {@link #startHour} will be set to 0 (for midnight) if this value is not set at config time
         * @accessor
         */
	    startHour: 0,
	    /**
         * @cfg {Number} endHour
         * The end hour for the time picker. If {@link #endHour} is greater than 12, 
         * meridiem slot will be ignored
         * @accessor
         * modificato Futura Sistemi
         */
	    endHour: 23,
        /**
         * @cfg {Number} startMinute
         * The start minute for the time picker.
         * @accessor
         * modificato Futura Sistemi
         */
	    startMinute: 0,
	    /**
         * @cfg {Number} endMinute
         * The end minute for the time picker.
         * @accessor
         */
	    endMinute: 59,
        /**
         * @cfg {Number} startSecond
         * The start second for the time picker.
         * @accessor
         */
	    startSecond: 0,
	    /**
         * @cfg {Number} endSecond
         * The end second for the time picker.
         * @accessor
         */
	    endSecond: 59,
	    /**
         * @cfg {Number} startMillisecond
         * The start millisecond for the time picker.
         * @accessor
         */
	    startMillisecond: 0,
	    /**
         * @cfg {Number} endMillisecond
         * The end millisecond for the time picker.
         * @accessor
         */
	    endMillisecond: 999,
        /**
         * @cfg {Array} hourList
         * Array of hours to use in the hour picker. If {@link #hourList} is defined, {@link #startHour},
         * {@link #endHour} and {@link #hourIncrement} will be ignored
         * @accessor
         */
        hourList: null,
        /**
         * @cfg {Array} minuteList
         * Array of minutes to use in the minute picker. If {@link #minuteList} is defined, {@link #startMinute},
         * {@link #endMinute} and {@link #minuteIncrement} will be ignored
         * @accessor
         */
        minuteList: null,
        /**
         * @cfg {Array} secondList
         * Array of seconds to use in the second picker. If {@link #secondList} is defined, {@link #startSecond},
         * {@link #endSecond} and {@link #secondIncrement} will be ignored
         * @accessor
         */
        secondList: null,
        /**
         * @cfg {Array} millisecondList
         * Array of milliseconds to use in the millisecond picker. If {@link #millisecondList} is defined, {@link #startMillisecond},
         * {@link #endMillisecond} and {@link #millisecondIncrement} will be ignored
         * @accessor
         */
        millisecondList: null,
        /**
         * @cfg {Number} hourIncrement
         * The increment value for hour.
         * @accessor
         */
        hourIncrement: 1,
        /**
         * @cfg {Number} minuteIncrement
         * The increment value for minute.
         * @accessor
         */
	    minuteIncrement: 1,
        /**
         * @cfg {Number} secondIncrement
         * The increment value for second.
         * @accessor
         * modificato Futura Sistemi
         */
        secondIncrement: 5,
        /**
         * @cfg {Number} millisecondIncrement
         * The increment value for millisecond.
         * @accessor
         */
        millisecondIncrement: 100,
        /**
         * @cfg {Array} slotOrder
         * The order of slots in the picker
         * @accessor
         */
	    slotOrder: ['hour','minute']
	},
    initialize: function() {
		this.callParent();
    },
    constructor: function() {
        this.callParent( arguments );
        this.createSlots();
    },
    setValue: function( value, animated ) {
        if ( Ext.isDate( value ) ) {
            var useMeridiem=Ext.Array.contains( this.getSlotOrder(), 'meridiem' );
            value = {
                hour  : useMeridiem && value.getHours()==0 ? 12 : value.getHours(),
                minute: value.getMinutes(),
                second: value.getSeconds(),
                millisecond: value.getMilliseconds(),
                meridiem: value.getHours() >= 12 ? this.getPMText() : this.getAMText()
            };
        }
        this.callParent([value, animated]);
    },
    getValue: function( useDom ) {
        var values = {},
            items = this.getItems().items,
            ln = items.length,
            date = new Date(),
            useMeridiem=Ext.Array.contains( this.getSlotOrder(), 'meridiem' ),
            hour, minute, second, millisecond, meridiem, item, i;
        // get slot values
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item instanceof Ext.picker.Slot) {
                values[ item.getName() ] = item.getValue( useDom );
            }
        }

        // if all the slots return null, we should not return a date
        if (values.hour === null ) {
            return null;
        }
        
        // process hour
        // make sure it's a number
        if( Ext.isNumber( values.hour ) ) {
            // if meridiem is active, need to smartly transform value
            if( useMeridiem ) {
                // if PM is selected
                if( values.meridiem == this.getPMText() ) {
                    hour = values.hour < 12 ? values.hour + 12 : values.hour;
                }
                if( values.meridiem == this.getAMText() ) {
                    hour = values.hour== 12 ? 0 : values.hour;
                }
            }
            else {
                hour = Ext.isNumber( values.hour ) ? values.hour : 0;
            }
        }
        minute = Ext.isNumber( values.minute ) ? values.minute : 0;
        second = Ext.isNumber( values.second ) ? values.second : 0;
        millisecond = Ext.isNumber( values.millisecond ) ? values.millisecond : 0;
        //meridiem = !Ext.isEmpty( values.meridiem ) ? values.meridiem : null;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, second, millisecond );
    },
    /**
     * Generates all slots specified by this component, and then sets them on the component
     * @private
     */
    createSlots: function() {
        var me= this,
            slotOrder = me.getSlotOrder(),
            ln, i, slots=[];
        // cleanup config
        me.cleanupConfig();
		// create array of slot data
        slotOrder.forEach( function ( item ) {
            var slot = me.createSlot( item )
            if( slot ) {
                slots.push( slot );
            }
        });
        me.setSlots( slots );
    },
    /**
     * Returns a slot config for a specified time.
     * @private
     */
    createSlot: function( name ) {
        var me = this;
        switch ( name ) {
            case 'hour':
                return {
                    name: 'hour',
                    align: 'center',
                    data: me.getHourCollection(),
                    title: me.getHourText(),
                    flex: 1
                };
            case 'minute':
                // make sure "use" flag is on
                if( Ext.Array.contains( me.getSlotOrder(), 'minute' ) ) {
                    return {
                        name: 'minute',
                        align: 'center',
                        data: me.getMinuteCollection(),
                        title: me.getMinuteText(),
                        flex: 1
                    };
                }
                break;
            case 'second':
                // make sure "use" flag is on
                if( Ext.Array.contains( me.getSlotOrder(), 'minute' ) && Ext.Array.contains( me.getSlotOrder(), 'second' ) ) {
                    return {
                        name: 'second',
                        align: 'center',
                        data: me.getSecondCollection(),
                        title: me.getSecondText(),
                        flex: 1
                    };
                }
                break;
            case 'millisecond':
                // make sure "use" flag is on
                if( Ext.Array.contains( me.getSlotOrder(), 'minute' ) && 
                    Ext.Array.contains( me.getSlotOrder(), 'second' ) && 
                    Ext.Array.contains( me.getSlotOrder(), 'millisecond' ) 
                ) {
                    return {
                        name: 'millisecond',
                        align: 'center',
                        data: me.getMillisecondCollection(),
                        title: me.getMillisecondText(),
                        flex: 1
                    };
                }
                break;
            case 'meridiem':
                // make sure "use" flag is on, and that the end hour is less than 13
                if( Ext.Array.contains( me.getSlotOrder(), 'meridiem' )  && me.getEndHour() <=12 ) {
                    return {
                        name: 'meridiem',
                        align: 'center',
                        data: [
                            {
                                text: me.getAMText(),
                                value: me.getAMText()
                            },  
                            {
                                text:me.getPMText(),
                                value:me.getPMText()
                            }                        
                        ],
                        title: me.getMeridiemText(),
                        flex: 1
                    };
                }
                break;
        }
    },
    cleanupConfig: function() {
        var me = this,
            shour = me.getStartHour(),
            ehour = me.getEndHour(),
            sminute = me.getStartMinute(),
            eminute = me.getEndMinute(),
            ssecond = me.getStartSecond(),
            esecond = me.getEndSecond(),
            smilli = me.getStartMillisecond(),
            emilli = me.getEndMillisecond(),
            useMeridiem = Ext.Array.contains( me.getSlotOrder(), 'meridiem' );
        // evaluate user config
        shour = shour < 1 || !Ext.isNumber( shour ) ? useMeridiem ? 1 : 0 : shour;
        ehour = ehour > 23 || !Ext.isNumber( ehour ) ? Ext.Array.contains( me.getSlotOrder(), 'meridiem' )  ? 12 : 23 : ehour;
        sminute = sminute < 0 || !Ext.isNumber( sminute ) ? 0 : sminute;
        eminute = eminute > 59 || !Ext.isNumber( eminute ) ? 59 : eminute;
        ssecond = ssecond < 1 || !Ext.isNumber( ssecond ) ? 0 : ssecond;
        esecond = eminute > 59 || !Ext.isNumber( esecond ) ? 59 : esecond;
        smilli = smilli < 1 || !Ext.isNumber( smilli ) ? 0 : smilli;
        emilli = emilli > 59 || !Ext.isNumber( emilli ) ? 999 : emilli;
        // set values
        me.setStartHour( shour );
        me.setEndHour( ehour );
        me.setStartMinute( sminute );
        me.setEndMinute( eminute );
        me.setStartSecond( ssecond );
        me.setEndSecond( esecond );
        me.setStartMillisecond( smilli );
        me.setEndMillisecond( emilli );
    },
    getHourCollection: function() {
        var me = this,
            hours = [];
        // compile collection of hour values
        // if an hour list is defined
        if( !!me.getHourList() ) {
            var list = me.getHourList();
            for( i=0; i<list.length; i++ ) {
                // ensure that hour is not greater than 23...otherwise, it will create an invalid date
                if( i<24 ) {
                    hours.push({
        				text: list[ i ],
        				value: list[ i ]
        			});
                }
            }
        }
        // otherwise, increment between start and end hour by increment setting
        else {
            for( i=me.getStartHour(); i<=me.getEndHour(); i += me.getHourIncrement() ) {
    			hours.push({
    				text: i,
    				value: i
    			});
    		}    
        }
        return hours;
    },
    getMinuteCollection: function() {
        var me = this,
            minutes = [];
        // compile collection of minute values
        // if a minute list is defined
        if( !!me.getMinuteList() ) {
            var list = me.getMinuteList();
            for( i=0; i<list.length; i++ ) {
                minutes.push({
    				text: list[ i ] <10 ? '0'+list[ i ] : list[ i ],
    				value: list[ i ]
    			});
            }
        }
        // otherwise, increment minutes automatically by increment setting
        else {
            for( i=me.getStartMinute(); i<=me.getEndMinute(); i += me.getMinuteIncrement() ) {
    			minutes.push({
    				text: i<10 ? '0'+i : i,
    				value:i
    			});
    		}    
        }
        return minutes;
    },
    getSecondCollection: function() {
        var me = this,
            seconds = [];
        // compile collection of second values
        // if a second list is defined
        if( !!me.getSecondList() ) {
            var list = me.getSecondList();
            for( i=0; i<list.length; i++ ) {
                // ensure that second is not greater than 59...otherwise, it will create an invalid date
                if( i<60 ) {
                    seconds.push({
        				text: list[ i ] <10 ? '0'+list[ i ] : list[ i ],
        				value: list[ i ]
        			});
                }
            }
        }
        // otherwise, increment seconds automatically by increment setting
        else {
            for( i=me.getStartSecond(); i<=me.getEndSecond(); i += me.getSecondIncrement() ) {
    			seconds.push({
    				text: i<10 ? '0'+i : i,
    				value:i
    			});
    		}    
        }
        return seconds;
    },
    getMillisecondCollection: function() {
        var me = this,
            milliseconds = [];
        // compile collection of milliseconds values
        // if a millisecond list is defined
        if( !!me.getMillisecondList() ) {
            var list = me.getMillisecondList();
            for( i=0; i<list.length; i++ ) {
                // ensure that millisecond is not greater than 999...otherwise, it will create an invalid date
                if( i<1000 ) {
                    milliseconds.push({
        				text: list[ i ] <10 ? '0'+list[ i ] : list[ i ],
        				value: list[ i ]
        			});
                }
            }
        }
        // otherwise, increment milliseconds automatically by increment setting
        else {
            for( i=me.getStartMillisecond(); i<=me.getEndMillisecond();  i += me.getMillisecondIncrement() ) {
    			milliseconds.push({
    				text: i<10 ? '0'+i : i,
    				value:i
    			});
    		}    
        }
        return milliseconds;
    }
});
