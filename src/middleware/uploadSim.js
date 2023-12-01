const multer = require("multer");

const uploadSim = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
            cb(new Error("Please upload an image or pdf"));
        }
        cb(undefined, true);
    },
});


module.exports = uploadSim;
