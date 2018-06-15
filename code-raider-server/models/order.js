var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectId = mongoose.Types.ObjectId;

var orderSchema = Schema({
	user:{
		type: Schema.Types.ObjectId, 
		ref: 'user' 
	},
  	codebase: { 
  		type: Schema.Types.ObjectId, 
  		ref: 'Codebase' 
  	},
	confirmed:{
		type: Boolean,
		required: true,
		default: false
	},
	create_date:{
		type: Date,
		default: Date.now
	},
});

var Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.getAllOrders = function(callback){
    Order.find({})
    .populate('codebase')
    .populate('user')
    .exec(callback);
}

module.exports.getMyOrders = function(user_id, query, callback){

    Order.find({user: user_id })
    .populate('codebase')
    .exec(callback);
}

module.exports.addOrder = function(user_id, order,callback){

	var query = {
		user: new ObjectId(user_id.toString()),
		codebase: new ObjectId(order.codebase_id.toString())
	}

    Order.find(query,function(err, results){

    	if(results.length > 0){
    		callback('Order already exists', null);
    	}
    	else{

			var dbOrder ={"user": user_id,
			"codebase": order.codebase_id, 
			"create_date": new Date()};

			Order.create(dbOrder, callback);
    	}

    });
}

module.exports.removeOrder = function(user,order_id, callback){

	if(user.isAdmin){
		Order.deleteOne({_id: order_id}, callback);
		return;
	}

	var query = {
		_id: new ObjectId(order_id.toString()),
		user: new ObjectId(user._id.toString())
	}

    Order.find(query,function(err, results){

    	if(results.length > 0){
    		Order.deleteOne(query, callback);
    	}
    	else{
			callback('Unauthorized user');
    	}

    });
}

module.exports.removeOrdersByUser = function(user_id, callback){

	var query = {
		user: new ObjectId(user_id.toString())
	};

    Order.find(query).remove().exec(callback);
}

module.exports.confirmOrder = function(user_id,order_id, callback){

	var query = {
		_id: new ObjectId(order_id.toString()),
		user: new ObjectId(user_id.toString())
	}

    Order.find(query,function(err, results){

    	if(results.length > 0){

    		var toUpdate = { confirmed: true };

    		Order.update(query,{$set:toUpdate}, callback);
    	}
    	else{

			callback('Unauthorized user');
    	}

    });
}
