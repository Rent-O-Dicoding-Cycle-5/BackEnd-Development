const {realtimeDB} = require("../config");


const locationsModel = {
    async read(id) {
        if (id) {
            const locationSnapshot = await realtimeDB.ref(`locations/${id}`).once("value");
            const location = locationSnapshot.val();
            if (!location) {
                throw new Error("Location not found");
            }
            return location;
        } else {
            const locationsSnapshot = await realtimeDB.ref("locations").once("value");
            const locations = locationsSnapshot.val();
            return locations;
        }
    },
};


module.exports = locationsModel;
