var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = Schema({
	latitude:{
		type: Number,
		required: true
	},
  	longtitude: { 
		type: Number,
		required: true
  	}
});

var Address = module.exports = mongoose.model('Address', addressSchema);

module.exports.getAllAddresses = function(callback){
    Address.find({}, callback);
}

