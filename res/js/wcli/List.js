Ext.ns('wcli');

Ext.define('wcli.List',{
	extend: 'Ext.List', 
	config: {
		controlName: {},
		variableHeights: true
	},
	constructor: function(){
		this.callParent(arguments);
		var me = this;
		var checkIfPainted = window.setInterval(function(){
			var control = document.getElementById(me.id)
			if(control){
				wcControl = Ext.getCmp(me.id);
				if(wcControl.container){
					if(wcControl.container.getScrollable()){
						wcControl.refreshScroller();
		    			
	    			}
    				clearInterval(checkIfPainted);
    			}
			}
		}, 100);
	},
});

Ext.define('wcli.NestedList',{
	extend: 'Ext.NestedList', 
	config: {
		controlName: {}
	},
});