const Address = require('../models/address');
const get_ip = require('ipware')().get_ip;

module.exports = {

	getAllAddresses: async(req, res, next) => {
		Address.getAllAddresses(function(err, addresses){
			if(err){
				res.status(404).send('Not Found');
				console.log(err);
			}
			else{
				res.status(200).json(addresses);
			}
		});
	}
}