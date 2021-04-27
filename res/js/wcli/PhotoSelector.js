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
		var me = this;
		var checkIfPainted = window.setInterval(function(){
			var control = document.getElementById(me.id)
			if(control){
				wcControl = Ext.get(me.id);
				if(!wcControl.hasListener('tap')){
					wcControl.addListener( 'tap', function(e){
						document.getElementById(control.id + 'file').click();
					});
				}
				clearInterval(checkIfPainted);
    			return;
			}
		}, 100);
	},
	
	getValue: function(){
		var value = this.value;
		return value;
	}
});
