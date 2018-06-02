const TwitterService = require('../services/TwitterService');

module.exports = {

	Notify: async(req, res, next) => {

		const tweet = req.body.notification;

		TwitterService.postTweet(tweet, function(err, tweet, response){
			if(err){
				res.status(400).send(err);
			}
			else{
				res.status(200).json(tweet);
			}
		});
	}
}