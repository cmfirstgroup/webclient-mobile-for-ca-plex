if (typeof wcli == "undefined") {
	wcli = {};
}

Ext.apply(wcli, {
	/**
	 * Returns an options object for an Ext.Ajax.Request options parameter
	 * @param {String} evt The plex event name
	 * @param {String} id The NameID of the control recieving the event
	 * @return {Object} An options object for an Ext.Ajax.Request
	 */
	evt: function(evt, id) {
		return {
			params: {
				_type: "json",
				ctlact: id + ":" + evt,
				focus: id
			},
			success: function(form, result) {
				if (result.alerts.length > 1) {
					var alerts = result.alerts;
					alerts.pop();
					(function display() {
						if (result.alerts.length > 0) {
							Ext.Msg.alert('Alert', alerts.pop(), display);
						}
					})();
				}
				else if (result.refresh) {
					eval(result.init).call(window);
					var panelConfig = eval(result.refresh);
					var newPanel = Ext.create(panelConfig);
					
					controller.on('cardswitch', function() {
						panel.destroy();
						window.panel = newPanel;
					}, { single: true });
					controller.setActiveItem(newPanel, 'slide');
				}
				else {
					// No point in setting values after a refresh...
					panel.setValues(result.values);
				}
			}
		};
	},
	
	// TODO: I added this function because including one template within
	// another obscures the original set of parameters; it was easier to
	// extract it from the control name than fixing it in WebClient.  We'll
	// still want to do that eventually...
	param: function(cname, key) {
		var res = '';
		Ext.each(cname.split(':'), function(ent) {
			ent = ent.split('=');
			if (ent[0] == key) {
				res = ent[1];
				return false;
			}
		});
		return res;
	},

	esc: function(str) {
		return str.replace(/ /g, "_");
	},

	unesc: function(data) {
		var dummy = document.createElement("div");
		dummy.innerHTML = data;
		data = dummy.innerHTML;
		delete dummy;
		return data;
	},

	regModel: function(name, cols) {
		cols = JSON.parse(cols);

		var model = { fields: [] };
		while (cols.length > 0) {
			model.fields.push({ name: cols.shift(), type: "string" });
		}
		Ext.regModel(name, model);
	},

	/**
	 * Generates a row template for the given column definitions
	 * @param {String} cols A stringified column definition array
	 * @return {String} A row template for a List control
	 */
	gridTpl: function(cols, heads) {
		cols = JSON.parse(cols);
		var tpl = "";
		tpl += "<div>";
		tpl += "<h1>{" + wcli.esc(cols[0]) + "}</h1>";
		tpl += "</div><div>";
		for (var i = 1; i < cols.length; i++) {
			var c = wcli.esc(cols[i]);
			var h = heads[i];
			tpl += "<span><p><b>" + h + "</b>: {" + c + "}</p></span>";
		}
		tpl += "</div>";
		return tpl;
	},

	gridStore: function(model, cols, rows) {
		cols = JSON.parse(cols);
		rows = JSON.parse(rows);
		var store = {
			model: model,
			data: []
		};
		while (rows.length > 0) {
			var row = rows.shift();
			var item = {};
			for (var i = 0; i < row.length; i++) {
				var name = cols[i];
				item[wcli.esc(name)] = row[i].v;
			}
			store.data.push(item);
		}
		return store;
	}
});