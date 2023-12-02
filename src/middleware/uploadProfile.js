const multer = require("multer");

const uploadProfile = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error("Please upload an image"));
        }
        cb(undefined, true);
    },
});


module.exports = uploadProfile;
