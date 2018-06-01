const Order = require('../models/order');
const get_ip = require('ipware')().get_ip;

module.exports = {

	getAllOrders: async(req, res, next) => {

		Order.getAllOrders(function(err, orders){
			if(err){
				res.status(404).send('Not Found');
				console.log(err);
			}
			else{
				res.status(200).json(orders);
			}
		});
	},

	getMyOrders: async(req, res, next) => {
		var user = req.user;

		Order.getMyOrders(user._id, function(err, orders){
			if(err){
				res.status(404).send('Not Found');
			}
			else{
				res.status(200).json(orders);
			}
		});
	},

	postOrder: async(req, res, next) => {
		var user = req.user;
		var order = req.body;

		Order.addOrder(user._id, order, function(err, order){
			if(err){
				res.status(400).send(err);
			}
			else{
				res.status(200).json(order);
			}
		});
	},

	deleteOrder: async(req, res, next) => {
		var user = req.user;
		var order_id = req.params.order_id;

		Order.removeOrder(user, order_id, function(err, order){
			if(err){
				res.status(401).send(err);
			}
			else{
				res.status(200).json(order);
			}
		});
	},
	confirmOrder: async(req, res, next) => {
		var user = req.user;
		var order_id = req.params.order_id;
		console.log(order_id);

		Order.confirmOrder(user._id, order_id, function(err, order){
			if(err){
				res.status(401).send(err);
			}
			else{
				res.status(200).json(order);
			}
		});
	}
}