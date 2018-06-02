var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});


module.exports = {
	postTweet: function(tweet, callback){
		client.post('statuses/update', {status: tweet}, callback);
	}
}
