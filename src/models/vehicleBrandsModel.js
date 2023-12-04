const {realtimeDB} = require("../config");


const vehicleBrandsModel = {
    async read(id) {
        if (id) {
            const vehicleBrandSnapshot = await realtimeDB.ref(`vehicleBrands/${id}`).once("value");
            const vehicleBrand = vehicleBrandSnapshot.val();
            if (!vehicleBrand) {
                throw new Error("Vehicle brand not found");
            }
            return vehicleBrand;
        } else {
            const vehicleBrandsSnapshot = await realtimeDB.ref("vehicleBrands").once("value");
            let vehicleBrands = vehicleBrandsSnapshot.val();
            vehicleBrands = vehicleBrands.filter((vehicleBrand) => vehicleBrand !== null);
            return vehicleBrands;
        }
    },

    async readByValue(value) {
        const vehicleBrandsSnapshot = await realtimeDB.ref("vehicleBrands").once("value");
        const vehicleBrands = vehicleBrandsSnapshot.val();
        if (!vehicleBrands.includes(value)) {
            throw new Error("Vehicle brand not found");
        }
        return value;
    },
};


module.exports = vehicleBrandsModel;
