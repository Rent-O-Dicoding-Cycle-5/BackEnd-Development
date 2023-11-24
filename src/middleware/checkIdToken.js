const {auth} = require("../config");

const checkIdToken = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        const idToken = authorization.replace("Bearer ", "");
        const decodedToken = await auth.verifyIdToken(idToken);
        req.uid = decodedToken.uid;
        next();
    } catch (error) {
        res.status(401).json({
            status: "failed",
            message: error.message,
        });
    }
};


module.exports = checkIdToken;
