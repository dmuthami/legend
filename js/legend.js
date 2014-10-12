var map, toc, dynaLayer1, dynaLayer2, featLayer1;

require(["dojo/_base/connect", "dojo/dom", "dojo/parser", "dojo/on", "dojo/_base/Color", "esri/map", "esri/geometry/Extent", "esri/layers/FeatureLayer", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer", "esri/symbols/SimpleFillSymbol", "esri/renderers/ClassBreaksRenderer", "agsjs/dijit/TOC", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/fx", "dojo/domReady!"], function(connect, dom, parser, on, Color, Map, Extent, FeatureLayer, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, SimpleFillSymbol, ClassBreaksRenderer, TOC) {

	// call the parser to create the dijit layout dijits
	parser.parse();
	// note djConfig.parseOnLoad = false;

	//Specify extent
	var extentInitial = new esri.geometry.Extent({
		"xmin" : 2636771.727724747,
		"ymin" : -2066857.244830621,
		"xmax" : 4984917.236644729,
		"ymax" : -875662.5960347558,
		"spatialReference" : {
			"wkid" : 102100
		}
	});

	map = new Map("map", {
		basemap : "topo",
		extent : extentInitial
	});

	dynaLayer1 = new ArcGISDynamicMapServiceLayer(
		"http://localhost:6080/arcgis/rest/services/Malawi/Operational_Layers/MapServer", {
		opacity : 0.8
	});

	map.on('layers-add-result', function(evt) {
		// overwrite the default visibility of service.
		// TOC will honor the overwritten value.
		/***
		 * Change default visible layers 
		 * dynaLayer1.setVisibleLayers([2, 5, 8, 11]);
		 */
		
		//try {
		toc = new TOC({
			map : map,
			layerInfos : [
			{
				layer : dynaLayer1,
				title : "Layers"
				//collapsed: false, // whether this root layer should be collapsed initially, default false.
				//slider: false // whether to display a transparency slider.
			}]
		}, 'tocDiv');
		toc.startup();
		toc.on('load', function() {
			if (console)
				console.log('TOC loaded');
		});
	});
	map.addLayers([dynaLayer1 /*, featLayer1*/]);
});
