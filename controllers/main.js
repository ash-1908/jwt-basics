const {BadRequestError} = require("../errors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		throw new BadRequestError("Please input username/password");
	}

	const _id = new Date().getTime();
	const token = jwt.sign({ _id, username }, process.env.SECRET_TOKEN, {
		expiresIn: "30d",
	});
	console.log(token);

	res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
	console.log(req.user)
	const randomNum = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello ${req.user.username}`,
		secret: `Here is your authorized data, you're lucky number is ${randomNum}`,
	});
};

module.exports = { login, dashboard };
