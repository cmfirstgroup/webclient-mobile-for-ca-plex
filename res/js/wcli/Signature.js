Ext.ns('wcli');

Ext.define('wcli.Signature',{
	extend: 'Ext.Component', 
	config: {
		name: '',
		controlName: {}
	},
	
	constructor: function(){
		this.callParent(arguments);
		this.on("painted", this.onPainted, this);
		this.isField = true;
		var me = this;
		var checkIfPainted = window.setInterval(function(){
			var control = document.getElementById(me.id)
			if(control){
				for (var i = 1; i < control.children.length - 1; i++){
    				if (control.children[i].tagName.toLowerCase() === 'canvas'){
    					clearInterval(checkIfPainted);
    					return;
    				}
    			}
    			Ext.getCmp(me.id).onPainted();
    			clearInterval(checkIfPainted);
			}
		}, 100);
	},
	
	onPainted: function(){
		var newCanvas = document.createElement("CANVAS");
		newCanvas.setAttribute("width", "600px");
		this.element.dom.style.width = "600px";
		this.up('container').element.dom.style.width = "600px";
		this.up('container').element.dom.style.marginLeft = "auto";
		this.up('container').element.dom.style.marginRight = "auto";
		this.element.appendChild(newCanvas);
		this.signaturePad = new SignaturePad(newCanvas);
		this.up('formpanel').setScrollable(false);
	},
	
	getValue: function(){
		var value = "";
		if(this.signaturePad){
			value = this.signaturePad.toDataURL();
			if(this.signaturePad.isEmpty()){
				value = "";
			}
		}
		return value;
	}
});
