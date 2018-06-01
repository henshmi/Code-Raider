var mongoose = require('mongoose');
const { URL } = require('url');

var codebaseSchema = mongoose.Schema({
	user_email:{
		type: String,
		required: true,
		unique: false,
		lowercase: true
	},
	title:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	imageUrl:{
		type: String,
		required: true
	},
	uploaded_date:{
		type: Date,
		default: Date.now
	},
	tags: {
		type: [String],
		required: false
	}
});

var Codebase = module.exports = mongoose.model('Codebase', codebaseSchema);


module.exports.getCodebase = function(id,callback){
	var query = {_id: id};

	Codebase.find(query, callback);
}

module.exports.getCodebases = function(limit,callback){

	var numOfCodebases;
	Codebase.count({}, function(err, count){
    	numOfCodebases = count;
    	if(limit>numOfCodebases){
    		limit = numOfCodebases;
    	}
    	Codebase.find({},callback).skip(numOfCodebases - limit);
	});
}

module.exports.addCodebase = function(user_email, codebase,callback){
	if(codebase._id){
		var toUpdate = {"user_email": user_email,
				"title": codebase.title, 
				"description": codebase.description, 
				"price": codebase.price,
				"tags": codebase.tags,
				"imageUrl": codebase.imageUrl}

		Codebase.update({_id:codebase._id},{$set:toUpdate}, callback);
	}else{
		var dbCodebase ={"user_email": user_email,
						"title": codebase.title, 
						"description": codebase.description, 
						"price": codebase.price,
						"tags": codebase.tags,
						"imageUrl": codebase.imageUrl,
						"create_date": new Date()}

		Codebase.create(dbCodebase, callback);
	}
}

module.exports.removeCodebase = function(id,callback){

	var query = {_id: id};

	Codebase.deleteOne(query, callback);
}

module.exports.getGroupedTags = function(callback){

	Codebase.aggregate([
		{ $match: {} }, 
		{ $project: { tags: 1 } }, 
		{ $unwind: '$tags' },
		{ $group: { 
	          _id: { tags: '$tags' }, 
	          count: { $sum: 1 }
	      }
	    },
	    { $sort: { count: -1 } }
	], callback);
}
//Spark a comment
// module.exports.sparkComment = function(commentId, user_email, callback){
// 	var dbComment = Comment.update({ _id: commentId }, { $push: { sparks: user_email }},callback);
// }
// //Unspark a comment
// module.exports.unsparkComment = function(commentId, user_email, callback){
// 	var dbComment = Comment.update({ _id: commentId }, { $pull: { sparks: user_email }},callback);
// }