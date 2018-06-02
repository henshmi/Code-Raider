var io;

module.exports = {
	setIOSocket: function(socket){
		io = socket;
	},

	notify: function(notification){
		io.emit('notification', notification);
	}
}