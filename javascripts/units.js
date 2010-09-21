var Amount = Class.create({
	initialize: function(kilobytes) {
		this.bytes = parseInt(kilobytes) * 1000;
	},
	getBytes: function() { return this.bytes; },
	appropriateUnit: function() {
		var length = this.getBytes().toString().length;
		return Unit.units.reverse(false).find(function(u) {
			return length > u.getPower();
		}) || Unit.find_by_name("bytes");
	},
	toUnit: function(toName) {
		var to = (typeof toName == "object") ? toName : Unit.find_by_name(toName);
		return to.fromBytes(this.getBytes());
	},
	toAppropriateUnit: function() {
		return this.toUnit(this.appropriateUnit());
	},
	toString: function() {
		var to = this.appropriateUnit();
		return this.toUnit(to).toFixed(2) + " " + to.getLabel();
	}
});

var Unit = Class.create({
	initialize: function(data) {
		this.data = data;
	},
	getName: function() { return this.data.unitName; },
	getPower: function() { return this.data.unitPower; },
	getLabel: function() { return this.data.unitLabel; },
	fromBytes: function(bytes) {
		var power = this.getPower();
		if (power <= 0) { power = 1; }
		return bytes / Math.pow(10, power);
	},
	toString: function() {
		return this.getName();
	}
});

Unit.units = [
	new Unit({ unitName: "bytes",     unitPower: 0,  unitLabel: "B" }),
	new Unit({ unitName: "kilobytes", unitPower: 3,  unitLabel: "KB" }),
	new Unit({ unitName: "megabytes", unitPower: 6,  unitLabel: "MB" }),
	new Unit({ unitName: "gigabytes", unitPower: 9,  unitLabel: "GB" }),
	new Unit({ unitName: "terabytes", unitPower: 12, unitLabel: "TB" }),
	new Unit({ unitName: "petabytes", unitPower: 15, unitLabel: "PB" })
];

Unit.find_by_name = function(name) {
	return Unit.units.find(function(u) {
		return u.getName().toLowerCase() == name.strip().toLowerCase();
	});
}
