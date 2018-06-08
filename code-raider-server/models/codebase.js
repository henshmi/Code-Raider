var mongoose = require('mongoose');
var Order = require('./order');

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

module.exports.getCodebases = function(query,callback){
	let tag = query.tag;
	const minprice = query.minprice;
	const maxprice = query.maxprice;

	let dbQueries = [];

	if(minprice){
		dbQueries.push({ "price": { $gte: minprice } });
	}

	if(maxprice){
		dbQueries.push({ "price": { $lte: maxprice } });
	}
	if(tag){
		tag = decodeURIComponent(tag);
		tag = tag.replace('+', "\\+");
		const pattern = new RegExp('.*'+tag+'.*', "i");
		dbQueries.push({ "tags": { $in: [pattern] }});
	}

	if(dbQueries.length === 0){
		dbQueries = [{}];
	}

    Codebase.find({})
    .and(dbQueries)
    .exec(callback);
}

module.exports.getRecommendedCodebases = function(user_id,callback){
	
	Order.getMyOrders(user_id, {}, function(err, orders){

		dbQueries = [];

		let allTags = [];

		for(let i = 0 ; i < orders.length ; i++ ){
			allTags = allTags.concat(orders[i].codebase.tags);
		} 

		const orderedCodebasesIds = orders.map(order => order.codebase._id);

		dbQueries.push({ "tags": { $in: allTags }})
		dbQueries.push({ "_id": { $nin: orderedCodebasesIds }})

		Codebase.find({})
		.and(dbQueries)
		.exec(callback);
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