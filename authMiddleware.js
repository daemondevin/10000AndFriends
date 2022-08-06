const { OAuth2Client } = require("google-auth-library");
const { sequelize, User } = require("./models");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports.checkUser = async (req, res, next) => {
	const token = req.headers.authorization;
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const pl = ticket.payload;

	req.user = await User.findOne({
		where: {
			vendorId: pl.sub,
		},
	});
	
	if (!req.user) {
		req.user = await User.create({
			vendorId: pl.sub,
			firstName: pl.given_name,
			lastName: pl.family_name,
			email: pl.email,
			picture: pl.picture,
		});
	}
	next();
};
