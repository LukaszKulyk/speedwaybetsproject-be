const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
		const token = req.headers.authorization.split(" ")[1];
		//console.log(token);
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
        //console.log(req.userData);
        if (req.userData.isAdmin === true) {
            next();
        }
        else {
            return res.status(401).json({
                message: 'Auth failed. You need to be logged in as admin.'
            });
        }
	} 
	catch (error) {
		return res.status(401).json({
			message: 'Auth failed.'
		});
	}
    //next();
}