Ext.ns('wcli');
Ext.ns('wcli.field');

Ext.define( 'wcli.field.TimePicker24', {
    extend: 'Ext.field.DatePicker',
    alternateClassName: 'Ext.form.TimePicker',
    xtype: 'timepickerfield',
    requires: [
        'wcli.Time24Base',
        'Ext.DateExtras'
    ],
    config: {
        /**
         * @cfg {String} [dateFormat=Ext.util.Format.defaultDateFormat] The format to be used when displaying the date in this field.
         * Accepts any valid date format. You can view formats over in the {@link Ext.Date} documentation.
         */
        dateFormat: 'G:i',
        /**
         * @cfg {String} default time
         * The default time to be used when initilizing the field
         * Example: '8:00', '14:50'
         */
        defaultTime: '8:00'
    },
    applyValue: function( value ) {
        var date = new Date();
        // if we have no value whatsoever, set a default
        if ( !Ext.isDate( value ) && !Ext.isObject( value ) ) {
            var defaultTime = this.getDefaultTime().split( ':' );
            return new Date( date.getYear(), date.getMonth(), date.getDate(), defaultTime[ 0 ], defaultTime[ 1 ] );
        }
        // if the value is an object, create a new date with time values based on object
        if ( Ext.isObject( value ) ) {         
            return new Date( date.getYear(), date.getMonth(), date.getDate(), value.hour, value.minute );
        }
        return value;
    },
    applyPicker: function( picker, pickerInstance ) {
        picker = Ext.factory( picker, 'Ext.ux.picker.Time' );
        picker.setHidden( true );
        Ext.Viewport.add( picker );
        /* modifica Futura per inizializzazione picker.
         * 
         */
        picker.setValue (this._value);
        /* fine modifica Futura per inizializzazione picker.
         * 
         */
        return picker;
    },
    /**
     * @cfg {String} [dateFormat=Ext.util.Format.defaultDateFormat] The format to be used when displaying the time in this field.
     * Accepts any valid date/time format. You can view formats over in the {@link Ext.Date} documentation.
     */
    getValue: function() {
        if ( this._picker && this._picker instanceof Ext.ux.picker.Time ) {
            if (this.eventDispatcher && this.eventDispatcher.controller.firingListeners[0] && this.eventDispatcher.controller.firingListeners[0].scope._handler && this.eventDispatcher.controller.firingListeners[0].scope._handler.caller.caller.$name === "doFire"){
                if (this._picker.getValue() != null){
                	return Ext.Date.format(this._picker.getValue(), 'H:i:s');
                }else{
                	return this._picker.getValue();
                }	
            }else{
                return this._picker.getValue();
            }
        }
        return this._value;
    },
    getPicker: function() {
        var picker = this._picker,
            value = this.getValue();
            
        if ( picker && !picker.isPicker ) {
            picker = Ext.factory( picker, Ext.ux.picker.Time );
            if ( value != null ) {
                picker.setValue( value );
            }
        }
        // add listeners
        picker.on({
            scope: this,
            change: 'onPickerChange',
            hide  : 'onPickerHide'
        });
        this._picker = picker;
        return picker;
    }
});
