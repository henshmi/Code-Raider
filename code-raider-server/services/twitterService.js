var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '7bCXm73KzYfLRztGVtShXq3c3',
  consumer_secret: '65dL9bHGdV3WdFDxk5lwJFHYFQgsT6lFrRwaKBbGRl6fBBC2hm',
  access_token_key: '809451856669900801-TGVrWTsBD3L77n7OppZHwCPoznaVgJT',
  access_token_secret: 'nF6iRlQtzheszuhUwkiKqHiVdlnqgeymmpimvEXEdm3X6'
});


module.exports = {
	postTweet: function(tweet, callback){
		client.post('statuses/update', {status: tweet}, callback);
	}
}
