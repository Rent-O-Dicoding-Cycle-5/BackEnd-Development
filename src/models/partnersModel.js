const {realtimeDB} = require("../config");
const rolesModel = require("./rolesModel");


const partnersModel = {
    async create(uid, partner) {
        const {
            fullName_KTP, nik_KTP, address_KTP, city_KTP, province_KTP, postalCode_KTP, dateBirth_KTP,
            type_SIM, number_SIM, expired_SIM,
        } = partner;

        const userSnapshot = await realtimeDB.ref("users").orderByChild("uid").equalTo(uid).once("value");
        const user = userSnapshot.val();
        if (!user) {
            throw new Error("User not found");
        }

        const partnerSnapshot = await realtimeDB.ref("partners").orderByChild("uid").equalTo(uid).once("value");
        const partnerData = partnerSnapshot.val();
        if (partnerData) {
            throw new Error("Partner already exists");
        }

        const createdPartner = await realtimeDB.ref(`partners/${uid}`).set({
            uid,
            fullName_KTP, nik_KTP, address_KTP, city_KTP, province_KTP, postalCode_KTP, dateBirth_KTP,
            type_SIM, number_SIM, expired_SIM,
            createdAt: new Date().toISOString(),
        });

        const rolesSnapshot = await rolesModel.read(2);
        const userRolesSnapshot = await realtimeDB.ref(`users/${uid}/roles`).once("value");
        let userRoles = userRolesSnapshot.val();
        if (userRoles && Array.isArray(userRoles)) {
            userRoles.push(rolesSnapshot);
        } else {
            userRoles = [rolesSnapshot];
        }
        await realtimeDB.ref(`users/${uid}/roles`).set(userRoles);

        return createdPartner;
    },

    async read(uid) {
        const partnerSnapshot = await realtimeDB.ref("partners").orderByChild("uid").equalTo(uid).once("value");
        const partner = partnerSnapshot.val();
        if (!partner) {
            throw new Error("Partner not found");
        }

        return partner;
    },

    async update(uid, partner) {
        const {type_SIM, number_SIM, expired_SIM} = partner;

        const partnerSnapshot = await realtimeDB.ref("partners").orderByChild("uid").equalTo(uid).once("value");
        const partnerData = partnerSnapshot.val();
        if (!partnerData) {
            throw new Error("Partner not found");
        }

        const updatedPartner = await realtimeDB.ref(`partners/${uid}`).update({
            type_SIM,
            number_SIM,
            expired_SIM,
            updatedAt: new Date().toISOString(),
        });

        return updatedPartner;
    },
};


module.exports = partnersModel;
