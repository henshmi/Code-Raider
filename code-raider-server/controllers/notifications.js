const TwitterService = require('../services/TwitterService');
var ioService = require('../services/io');

module.exports = {

	Notify: async(req, res, next) => {

		const notification = req.body.notification;

		ioService.notify(notification);

		TwitterService.postTweet(notification, function(err, tweet, response){
			if(err){
				res.status(400).send(err);
			}
			else{
				res.status(200).json(tweet);
			}
		});
	}
}