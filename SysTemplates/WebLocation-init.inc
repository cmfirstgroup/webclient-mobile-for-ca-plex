window["/(!NameID)_geo"] = new Ext.util.GeoLocation({
    autoUpdate: false,
    allowHighAccuracy: true,     // critical
    timeout: 10000,              // wait for real GPS
    maximumAge: 0,               // do not use cached values
    listeners: {
        locationupdate: function (geo) {

            if (geo.getAccuracy() > 50) { 
                // retry until GPS accuracy is acceptable (<50m)
                geo.updateLocation();
                return;
            }

            var lat = geo.getLatitude();
            var lng = geo.getLongitude();

            var str = lat + ", " + lng;

            Ext.getCmp("/(!NameID)").setValue(str);
            panel.setValues({ "/(!NameID)": str });

            /(!If:/(!Event:phys=Updated))
            panel.submit(wcli.util.evt("Updated", "/(!NameID)"));
            /(!If)

            /(!If:/(!Event:phys=Modified))
            panel.submit(wcli.util.evt("Modified", "/(!NameID)"));
            /(!If)
        }
    }
});

window["/(!NameID)_geo"].updateLocation();
