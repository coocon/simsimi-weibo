var cp = require('child_process')
  , collection_cp = cp.fork('./collection.js');

collection_cp.on('message', function(data) {		
	console.log(data.length)
	for (var i=0; i<data.length; i++) {
		comment_cp = cp.fork('./comment.js', [data[i].mid, data[i].uid, data[i].wvr]);
		comment_cp.on('message', function() {
			console.log('success');
		});
	}
});

