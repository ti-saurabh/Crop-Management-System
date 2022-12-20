const jwt = require('jsonwebtoken')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];

        //If no token is present in the request header return error. This means the user is not logged in.
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        jwt.verify(token, 'project', function (err, decode) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            } else {
                req.decodedToken = decode;
                next()
            }
        })
    }
    catch (err) {
        res.status(500).send({ msg: "Error", error: err.message })
    }
};

module.exports={authentication}