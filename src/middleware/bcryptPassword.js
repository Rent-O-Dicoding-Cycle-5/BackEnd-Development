const bcrypt = require("bcrypt");

const saltRounds = 10;

const bcryptPassword = {
    async hash(password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    },

    async compare(password, hashedPassword) {
        const comparedPassword = await bcrypt.compare(password, hashedPassword);
        return comparedPassword;
    },
};


module.exports = bcryptPassword;
