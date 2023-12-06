const multer = require("multer");

const uploadVehicle = multer({
    storage: multer.memoryStorage(),
    fileFilter(req, files, cb) {
        if (!files.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
    },
});


module.exports = uploadVehicle;
