const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	}
});


userSchema.pre('save', async function(next){
	try{

		const salt = await bcrypt.genSalt(10);
		//Generates password hash (salt+hash);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();

	}catch(error){
		next(error);
	}

});

userSchema.methods.isValidPassword = async function(newPassword){
	try{
		return await bcrypt.compare(newPassword, this.password);
	}catch(error){
		throw new Error(error);
	}
}

const User = mongoose.model('user', userSchema);


User.getUsers = function(callback){
    User.find({}, callback);
}

User.removeUser = function(id,callback){

	var query = {_id: id};

	User.deleteOne(query, callback);
}

module.exports = User;