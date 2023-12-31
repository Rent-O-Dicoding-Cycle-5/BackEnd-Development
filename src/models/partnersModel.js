require("dotenv").config();
const {realtimeDB, storage} = require("../config");
const rolesModel = require("./rolesModel");


const partnersModel = {
    async create(uid, partner) {
        const {
            phoneNumber, fullName_KTP, nik_KTP, address_KTP, city_KTP, province_KTP, postalCode_KTP, placeBirth_KTP, dateBirth_KTP,
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

        const ktpData = {
            fullName_KTP, nik_KTP, address_KTP, city_KTP, province_KTP, postalCode_KTP, placeBirth_KTP, dateBirth_KTP,
        };

        const simData = {
            type_SIM, number_SIM, expired_SIM,
        };

        const createdPartner = await realtimeDB.ref(`partners/${uid}`).set({
            uid,
            phoneNumber,
            ktpInformation: ktpData,
            simInformation: simData,
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

        const updatedPartner = await realtimeDB.ref(`partners/${uid}/simInformation`).update({
            type_SIM,
            number_SIM,
            expired_SIM,
            updatedAt: new Date().toISOString(),
        });

        return updatedPartner;
    },

    async uploadImgSim(uid, simImage) {
        if (!simImage) {
            throw new Error("Please upload an image");
        }

        const formattedDate = new Date().toISOString().replace(/-|:|T|Z|\./g, "");
        const extension = simImage.originalname.split(".").pop();
        const simPath = `partners/${uid}/sim/${formattedDate}${Date.now()}.${extension}`;

        await storage.bucket().file(simPath).save(simImage.buffer);

        const url_SIM = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${simPath}`;
        await realtimeDB.ref(`partners/${uid}/simInformation`).update({url_SIM});

        return url_SIM;
    },
};


module.exports = partnersModel;
