const {realtimeDB} = require("../config");


const rolesModel = {
    async read(id) {
        if (id) {
            const roleSnapshot = await realtimeDB.ref(`roles/${id}`).once("value");
            const role = roleSnapshot.val();
            if (!role) {
                throw new Error("Role not found");
            }
            return role;
        } else {
            const rolesSnapshot = await realtimeDB.ref("roles").once("value");
            const roles = rolesSnapshot.val();
            return roles;
        }
    },
};


module.exports = rolesModel;
