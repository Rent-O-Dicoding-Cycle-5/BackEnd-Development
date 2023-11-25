const usersModel = require("../models/usersModel");

const checkAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers;
        if (!authorization) {
            throw new Error("You are not authorized");
        }
        const uid = authorization.replace("Bearer ", "");
        const user = await usersModel.read(uid);
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
