const Codebase = require('../models/codebase');
const get_ip = require('ipware')().get_ip;
const Order = require('../models/order');

module.exports = {

	getCodebase: async(req, res, next) => {
		var id = req.params._id;

		Codebase.getCodebase(id, function(err, codebase){
			if(err){
				res.status(404).send('Not Found');
			}
			else{
				res.status(200).json(codebase);
			}
		});
	},
	getCodebases: async(req, res, next) => {

		const query = req.query;

		Codebase.getCodebases(query, function(err, codebases){
			if(err){
				res.status(404).send('Not Found');
			}
			else{
				res.status(200).json(codebases);
			}
		});
	},
	getRecommendedCodebases: async(req, res, next) => {

		const user_id = req.user._id;

		Codebase.getRecommendedCodebases(user_id, function(err, codebases){
			if(err){
				res.status(404).send('Not Found');
			}
			else{
				res.status(200).json(codebases);
			}
		});
	},
	postCodebase: async(req, res, next) => {
		var user = req.user;
		var codebase = req.body;

		Codebase.addCodebase(user.email, codebase, function(err, codebase){
			if(err){
				res.status(500).send('Server Error');
			}
			res.status(200).json(codebase);
		});
	},
	deleteCodebase: async(req, res, next) => {
		var id = req.params._id;

		Codebase.removeCodebase(id, function(err, codebase){
			Order.removeOrdersByCodebase(id, function(){
				if(err){
					res.status(500).send('Server Error');
				}
				else{
					res.status(200).json(codebase);
				}
			});
		});
	},
	getGroupedTags: async(req, res, next) => {
		Codebase.getGroupedTags(function(err, tags){
			if(err){
				res.status(404).send('Not Found');
			}

			res.status(200).json(tags);
		});
	},
	// 	Comment.sparkComment(spark._id, user.email, function(err, result){
	// 		if(err){
	// 			res.status(404).send('Not Found');
	// 		}

	// 		res.status(200).json({"sparked": "true"});
	// 	});
	// },
	// unsparkComment: async(req, res, next) => {
	// 	var user = req.user;
	// 	var spark = req.body;

	// 	Comment.unsparkComment(spark._id, user.email, function(err, result){
	// 		if(err){
	// 			res.status(404).send('Not Found');
	// 		}

	// 		res.status(200).send('{"unsparked": "true"}');
	// 	});
	// }
}