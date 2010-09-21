var Traffic = Class.create({
	initialize: function(json) {
		this.json = json;
		
		this.total = {
			sent: new Amount(this.json.total.tx),
			received: new Amount(this.json.total.rx)
		};
		
		this.monthly = Traffic.gleanRecords(this.json.months.month);
		this.daily = Traffic.gleanRecords(this.json.days.day);
		this.hourly = Traffic.gleanRecords(this.json.hours.hour);
	}
});

Traffic.gleanRecords = function(json) {
	var records = [];
	if (Object.isArray(json)) {
		records = json.map(function(r) { return new TrafficRecord(r); });
	} else {
		records.push(new TrafficRecord(json));
	}
	return records;
}

var TrafficRecord = Class.create({
	initialize: function(json) {
		this.json = json;
		this.date = JSON.toDate(this.json);
		this.sent = new Amount(this.json.tx);
		this.received = new Amount(this.json.rx);
	}
});
