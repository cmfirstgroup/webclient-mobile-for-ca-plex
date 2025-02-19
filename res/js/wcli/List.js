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
		    			if(me.config.mobileLoadGrid){
		    				wcControl.container.getScrollable().getScroller().on('scroll', (e,x,y)=>{
								if(me.container.items.length >= 63){																					
									var currentPosition = me.container.getScrollable().getScroller().lastDragPosition.y
									if (currentPosition >= me.getScrollable().getScroller().getMaxPosition().y && !me.config.blockLoadPage) {	
										me.config.blockLoadPage = true;														
										panel.submit(wcli.util.evt("Load Grid", me.config.name));
							        }
						        }								
							}, this);		    	
						}
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