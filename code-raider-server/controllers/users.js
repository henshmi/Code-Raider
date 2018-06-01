const JWT = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../configuration/index');

signToken = user => {

	return JWT.sign({
		iss: 'comon',
		sub: user._id,
		iat: new Date().getTime(),
		exp: new Date().getTime() + 1000*3600*24 // current ime + 1 day ahead 
	},JWT_SECRET);
}

module.exports = {
	signUp: async(req, res, next) => {
		const { email, password } = req.value.body;

		const foundUser = await User.findOne({email});

		if(foundUser){
			return res.status(403).json({error: "Email is already in use"});
		}

		const newUser = new User({email, password, 'isAdmin': false});
		await newUser.save();

		//Generate a token.
		const token = signToken(newUser);

		//Respond with the token.
		res.status(200).json({token});
	},

	signIn: async(req, res, next) => {
		const token = signToken(req.user);
		res.status(200).json({ 'token': token, 'isAdmin': req.user.isAdmin })
	}
}