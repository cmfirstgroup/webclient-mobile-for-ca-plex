wcli.regModel("/(!NameID)", wcli.unesc("/(!This:!jsonCols)"));
window["/(!NameID)_store"] = new Ext.data.JsonStore(
	wcli.gridStore("/(!NameID)",
		wcli.unesc("/(!This:!jsonCols)"),
		wcli.unesc("/(!This:!jsonRows)"))
);