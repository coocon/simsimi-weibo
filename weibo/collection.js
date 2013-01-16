/*
 * author maoshuyu
 */
var cp = require('child_process')
  , _ = require('underscore')
  , latestId = require('./setting').latestId
  , end_id = null 
  , list = [];

function collection(max_id) {
	var at_cp, hasMore = true;
	if (max_id) at_cp = cp.fork('./at.js', [end_id, max_id]);
	else at_cp = cp.fork('./at.js');
	at_cp.on('message', function(data) {
		var len = data.length;
		if (!end_id) {
			end_id = data[0].mid;
		}
		if (len > 0 && data[0].mid != latestId) {
			for (var i=0; i<len; i++) {
				if (data[i].mid == latestId) {
					end();
					hasMore = false;
					break;
				}
				list.push(data[i]);
			}
			if (hasMore) {
				collection(data[len-1].mid);
			}
		} else {
			end();
		}	
	});
}

function end() {
	process.send(list);
	list = [];
	latestId = end_id;
	end_id = null;
	setTimeout(collection, 500);
}

collection();
