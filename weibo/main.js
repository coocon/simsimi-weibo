var cp = require('child_process');

var at_cp = cp.fork('./at.js');

at_cp.on('message', function(data) {		
	for (var i=0; i<data.length; i++) {
		comment_cp = cp.fork('./comment.js', [data[i].mid, data[i].uid]);
		comment_cp.on('message', function() {
			console.log('success');
		})
	}
});
