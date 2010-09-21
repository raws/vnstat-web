var Stats = Class.create({
	initialize: function(json) {
		this.json = json;
		this.interface = this.json.vnstat.interface.nick;
		this.created = JSON.toDate(this.json.vnstat.interface.created);
		this.updated = JSON.toDate(this.json.vnstat.interface.updated);
		this.traffic = new Traffic(this.json.vnstat.interface.traffic);
	}
});
