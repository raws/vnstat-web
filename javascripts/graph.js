var Graph = Class.create({
	initialize: function(data) {
		this.data = data;
	},
	getQueryString: function() {
		return Object.toQueryString(this.data);
	},
	getURI: function() {
		return Graph.baseURI + "?" + this.getQueryString();
	},
	getImageTag: function() {
		return '<img src="' + this.getURI() + '" />';
	}
});

Graph.baseURI = "http://chart.apis.google.com/chart";

Graph.getRangeFor = function(values) {
	var upper = Math.ceil(values.max(function(v) { return v; }) * 1.2);
	var lower = Math.floor(values.min(function(v) { return v; }) * 0.5);
	return [lower, upper];
}

Graph.fillData = function(values, minSize, fillWith) {
	if (values.length < minSize) {
		var diff = minSize - values.length;
		for (var i=0; i <= diff; i++)
			values.push(fillWith);
	}
	
	return values;
}
