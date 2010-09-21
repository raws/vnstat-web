JSON.toDate = function(json) {
	var d = new Date(json.date.year, json.date.month, json.date.day || 1);
	if (json.time) {
		d.setHours(json.time.hour);
		d.setMinutes(json.time.minute);
	}
	return d;
}
