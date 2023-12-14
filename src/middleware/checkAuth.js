const usersModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            throw new Error("You are not authorized");
        }
        const token = authorization.replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const user = await usersModel.read(decodedToken.uid);
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};


module.exports = checkAuth;
