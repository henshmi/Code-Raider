
module.exports = {
	requiresAdmin: function() {
	  return [
	    function(req, res, next) {
	      if (req.user && req.user.isAdmin === true)
	        next();
	      else
	        res.send(401, 'Unauthorized');
	    }
	  ]
	}
}