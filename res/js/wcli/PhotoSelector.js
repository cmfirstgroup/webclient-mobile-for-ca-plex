Ext.ns('wcli');

Ext.define('wcli.PhotoSelector',{
	extend: 'Ext.Component', 
	config: {
		name: '',
		controlName: {}
	},
	
	constructor: function(){
		this.callParent(arguments);
		this.isField = true;
	},
	
	getValue: function(){
		var value = this.value;
		return value;
	}
});
