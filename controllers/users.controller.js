const service = require("../services/users.service");
const {
	newUserValidation,
	loginValidation
} = require("../validators/users.validator");


/**
 * POST requist handler: creates a new user
 * sends: the user object or error object
 */
const createUser = async (req, res) => {
	try {
		const {error} = newUserValidation(req.body);
		if (error) return res.status(400).send({error: error.details[0].message});
		const user = await service.createUser(req.body);
		res.send(user);
	}
	catch(err) {
		res.status(400).send({error: "this email is used"});
	}
};

/**
 * GET requist handler: retrieves all the users
 * sends: array of all the available users
 */
const getAllUsers = async (req, res) => {
	try {
		let all = await service.getAllUsers();
		res.send(all);
	}
	catch(err) {
		res.status(500).send({ error: "Internal Error" });
		console.log(err);
	}
};

/**
 * GET requist handler: user log in
 * sends: access token or error message
 */
const logingUser = async (req, res) => {
	let result = await service.login(req.body);
	if (result.error) return res.status(401).send(result);
	res.header(result).send(result);
};


module.exports = {
	createUser,
	getAllUsers,
	logingUser
};
