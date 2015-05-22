Ext.define('Override.util.SizeMonitor', {
	override : 'Ext.util.SizeMonitor',

	constructor : function (config) {
		var namespace = Ext.util.sizemonitor;

		if (Ext.browser.is.Firefox) {
			return new namespace.OverflowChange(config);
		} else if (Ext.browser.is.WebKit) {
			if (!Ext.browser.is.Silk && Ext.browser.engineVersion.gtEq('535') && !Ext.browser.engineVersion.ltEq('537.36')) {
				return new namespace.OverflowChange(config);
			} else {
				return new namespace.Scroll(config);
			}
		} else if (Ext.browser.is.IE11) {
			return new namespace.Scroll(config);
		} else {
			return new namespace.Scroll(config);
		}
	}
});

Ext.define('Override.util.PaintMonitor', {
	override : 'Ext.util.PaintMonitor',
	constructor: function(config) {
       if (Ext.browser.is.Firefox || (Ext.browser.is.WebKit && Ext.browser.engineVersion.gtEq('536') && !Ext.browser.engineVersion.ltEq('537.36') && !Ext.os.is.Blackberry)) {
           return new Ext.util.paintmonitor.OverflowChange(config);
       }
       else {
           return new Ext.util.paintmonitor.CssAnimation(config);
       }
   }
});