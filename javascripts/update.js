function updateStats() {
	var requestURI = "json.php";
	
	new Ajax.Request(requestURI, {
		onSuccess: function(response) {
			var stats = new Stats(response.responseJSON);
			Stats.instance = stats;
			
			$("updated").update(stats.updated);
			
			var colors = ["127fef", "ef8f12"];
			
			/**
			 * All-time total bandwidth usage
			**/
			var sent = stats.traffic.total.sent;
			var received = stats.traffic.total.received;
			var unit = [sent, received].sortBy(function(t) { return t.getBytes(); }).last().appropriateUnit();
			var data = [sent, received].map(function(t) { return t.toUnit(unit); });
			var range = Graph.getRangeFor(data);
			
			var g = new Graph({
				cht: "bhg",
				chs: "600x150",
				chd: "t:" + data.join("|"),
				chdl: "Sent|Received",
				chtt: "All-Time",
				chco: colors.join(","),
				chf: "bg,s,ffffff00",
				chbh: "a",
				chxt: "x,x",
				chxl: "1:|" + unit.getName().capitalize(),
				chxp: "1,50",
				chds: range.join(","),
				chxr: [0, range[0], range[1]].join(","),
				chm: "N*f2* " + unit.getLabel() + ",666666,0,,11,0,l:5:|N*f2* " + unit.getLabel() + ",666666,1,,11,0,l:5:",
				chg: "10,0,1,5"
			});
			$("graph-total").update(g.getImageTag());
			
			/**
			 * Hourly bandwidth usage
			**/
			var hourly = stats.traffic.hourly;
			
			var sentUnit = hourly.map(function(h) {
				return h.sent;
			}).sortBy(function(s) {
				return s.getBytes();
			}).last().appropriateUnit();
			
			var sentData = Graph.fillData(hourly.map(function(h) {
				return h.sent.toUnit(sentUnit);
			}), 24, 0);
			var sentYRange = Graph.getRangeFor(sentData);
			
			var recvData = Graph.fillData(hourly.map(function(h) {
				return h.received.toUnit(sentUnit);
			}), 24, 0);
			
			g = new Graph({
				cht: "lc",
				chtt: "Last 24 Hours",
				chco: colors.join(","),
				chf: "bg,s,ffffff00",
				chs: "600x300",
				chd: "t:" + [sentData, recvData].map(function(a){return a.join(",");}).join("|"),
				chdl: "Sent|Received",
				chxt: "x,x,y,y",
				chxr: [[0,0,24], [1,0,24], [2, sentYRange[0], sentYRange[1], 5]].map(function(a){return a.join(",");}).join("|"),
				chxl: "1:|Hours Ago|3:|" + sentUnit.getLabel(),
				chxp: "1,12|3,50",
				chds: sentYRange.join(","),
				// chm: "N*f1* "+sentUnit.getLabel()+",666666,0,2:22:2,11,0,h",
				chg: "4.16,25,1,5"
			});
			$("graph-hourly").update(g.getImageTag());
			
			/**
			 * Daily bandwidth usage
			**/
			var daily = stats.traffic.daily;
			
			sentUnit = daily.map(function(d) {
				return d.sent;
			}).sortBy(function(s) {
				return s.getBytes();
			}).last().appropriateUnit();
			
			sentData = Graph.fillData(daily.map(function(d) {
				return d.sent.toUnit(sentUnit);
			}), 31, 0);
			console.log(Object.inspect(sentData));
			sentYRange = Graph.getRangeFor(sentData);
			
			recvData = Graph.fillData(daily.map(function(d) {
				return d.received.toUnit(sentUnit);
			}), 31, 0);
			
			g = new Graph({
				cht: "lc",
				chtt: "Last Month",
				chco: colors.join(","),
				chf: "bg,s,ffffff00",
				chs: "600x300",
				chd: "t:" + [sentData, recvData].map(function(a){return a.join(",");}).join("|"),
				chdl: "Sent|Received",
				chxt: "x,x,y,y",
				chxr: [[0,0,31,2], [1,0,31], [2, sentYRange[0], sentYRange[1]]].map(function(a){return a.join(",");}).join("|"),
				chxl: "1:|Days Ago|3:|" + sentUnit.getLabel(),
				chxp: "1,15|3,50",
				chds: sentYRange.join(","),
				chg: "3.225,25,1,5"
			});
			$("graph-daily").update(g.getImageTag());
			
			/**
			 * Monthly bandwidth usage
			**/
			var monthly = stats.traffic.monthly;
			
			sentUnit = monthly.map(function(m) {
				return m.sent;
			}).sortBy(function(s) {
				return s.getBytes();
			}).last().appropriateUnit();
			
			sentData = Graph.fillData(monthly.map(function(m) {
				return m.sent.toUnit(sentUnit);
			}), 12, 0);
			sentYRange = Graph.getRangeFor(sentData);
			
			recvData = Graph.fillData(monthly.map(function(m) {
				return m.received.toUnit(sentUnit);
			}), 12, 0);
			
			g = new Graph({
				cht: "lc",
				chtt: "Last Year",
				chco: colors.join(","),
				chf: "bg,s,ffffff00",
				chs: "600x300",
				chd: "t:" + [sentData, recvData].map(function(a){return a.join(",");}).join("|"),
				chdl: "Sent|Received",
				chxt: "x,x,y,y",
				chxr: [[0,0,12,1], [1,0,12], [2, sentYRange[0], sentYRange[1]]].map(function(a){return a.join(",");}).join("|"),
				chxl: "1:|Months Ago|3:|" + sentUnit.getLabel(),
				chxp: "1,6|3,50",
				chds: sentYRange.join(","),
				chg: "8.33,25,1,5"
			});
			$("graph-monthly").update(g.getImageTag());
		}
	});
}
