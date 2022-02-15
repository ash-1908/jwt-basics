const {UnauthorizedError} = require("../errors");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith(`Bearer `)) {
		throw new UnauthorizedError("No token found");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
		const { _id, username } = decoded;
		req.user = { _id, username };
		next();
	} catch (error) {
		throw new UnauthorizedError("Invalid token");
	}
};

module.exports = authenticationMiddleware;
