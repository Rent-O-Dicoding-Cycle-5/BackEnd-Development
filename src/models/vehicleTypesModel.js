const {realtimeDB} = require("../config");


const vehicleTypesModel = {
    async read(id) {
        if (id) {
            const vehicleTypeSnapshot = await realtimeDB.ref(`vehicleTypes/${id}`).once("value");
            const vehicleType = vehicleTypeSnapshot.val();
            if (!vehicleType) {
                throw new Error("Vehicle type not found");
            }
            return vehicleType;
        } else {
            const vehicleTypesSnapshot = await realtimeDB.ref("vehicleTypes").once("value");
            let vehicleTypes = vehicleTypesSnapshot.val();
            vehicleTypes = vehicleTypes.filter((vehicleType) => vehicleType !== null);
            return vehicleTypes;
        }
    },

    async readByValue(value) {
        const vehicleTypesSnapshot = await realtimeDB.ref("vehicleTypes").once("value");
        const vehicleTypes = vehicleTypesSnapshot.val();
        if (!vehicleTypes.includes(value)) {
            throw new Error("Vehicle type not found");
        }
        return value;
    },
};


module.exports = vehicleTypesModel;
