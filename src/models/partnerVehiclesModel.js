require("dotenv").config();
const {realtimeDB, storage} = require("../config");
const vehicleTypesModel = require("./vehicleTypesModel");
const vehicleBrandsModel = require("./vehicleBrandsModel");
const locationsModel = require("./locationsModel");
const generateId = require("../utils/generateId");


const partnerVehiclesModel = {
    async create(uid, req) {
        const {
            name, type, brand, plateNumber,
            bpkb, stnk, year, seats, description,
            cost, location, address,
        } = req.body;

        const vehicleImage = req.file;

        const partnerSnapshot = await realtimeDB.ref(`partners/${uid}`).once("value");
        const partner = partnerSnapshot.val();
        if (!partner) {
            throw new Error("Partner not found");
        }
        const partnerId = partner.uid;
        const partnerPhoneNumber = partner.phoneNumber;
        const partnerName = partner.ktpInformation.fullName_KTP;

        const userSnapshot = await realtimeDB.ref(`users/${partnerId}`).once("value");
        const user = userSnapshot.val();
        if (!user) {
            throw new Error("User not found");
        }
        const partnerImage = user.urlImage;

        const vehicleType = await vehicleTypesModel.readByValue(type);
        if (!vehicleType) {
            throw new Error("Vehicle type not found");
        }

        const vehicleBrand = await vehicleBrandsModel.readByValue(brand);
        if (!vehicleBrand) {
            throw new Error("Vehicle brand not found");
        }

        const locations = await locationsModel.readByValue(location);
        if (!locations) {
            throw new Error("Location not found");
        }

        const newId = generateId();

        const partnerVehicleData = {name, type, brand, plateNumber, bpkb, stnk, year, seats, description};
        const partnerVehicleInformation = {cost, location, address};

        await realtimeDB.ref(`partnerVehicles/${uid}/${newId}`).set({
            uid,
            partnerVehicleData,
            partnerVehicleInformation,
            vehicleId: newId,
            createdAt: new Date().toISOString(),
        });

        const locationData = [location];
        const partnerData = {partnerId, partnerName, partnerPhoneNumber, partnerImage};
        const vehicleData = {name, type, brand, description, year, seats, cost};

        const formattedDate = new Date().toISOString().replace(/-|:|T|Z|\./g, "");
        const extension = vehicleImage.originalname.split(".").pop();
        const vehiclePath = `vehicles/${uid}/images/${newId}/${formattedDate}.${extension}`;

        await storage.bucket().file(vehiclePath).save(vehicleImage.buffer);

        const ImageUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${vehiclePath}`;

        await realtimeDB.ref(`vehicles/${newId}`).set({
            vehicleId: newId,
            locations: locationData,
            partner: partnerData,
            vehicleInformation: vehicleData,
            isAvailable: true,
            ImageUrl,
            createdAt: new Date().toISOString(),
        });

        return newId;
    },

    async read(uid) {
        const partnerVehiclesSnapshot = await realtimeDB.ref(`partnerVehicles/${uid}`).once("value");
        const partnerVehicles = partnerVehiclesSnapshot.val();
        if (!partnerVehicles) {
            throw new Error("Partner vehicles not found");
        }

        const partnerVehiclesData = [];
        for (const [key, value] of Object.entries(partnerVehicles)) {
            const vehicleId = value.vehicleId;
            const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");
            const vehicle = vehicleSnapshot.val();
            if (!vehicle) {
                throw new Error("Vehicle not found");
            }
            partnerVehiclesData.push(vehicle);
        }

        return partnerVehiclesData;
    },

    async update(uid, vehicleId, req) {
        const {
            name, type, brand, plateNumber,
            bpkb, stnk, year, seats, description,
            cost, location, address,
        } = req.body;

        const vehicleImage = req.file;

        const partnerSnapshot = await realtimeDB.ref(`partners/${uid}`).once("value");
        const partner = partnerSnapshot.val();
        if (!partner) {
            throw new Error("Partner not found");
        }

        const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");
        const vehicle = vehicleSnapshot.val();
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        const vehicleType = await vehicleTypesModel.readByValue(type);
        if (!vehicleType) {
            throw new Error("Vehicle type not found");
        }

        const vehicleBrand = await vehicleBrandsModel.readByValue(brand);
        if (!vehicleBrand) {
            throw new Error("Vehicle brand not found");
        }

        const locations = await locationsModel.readByValue(location);
        if (!locations) {
            throw new Error("Location not found");
        }

        const locationDatas = [location];
        const vehicleDatas = {name, type, brand, description, year, seats, cost};

        const formattedDate = new Date().toISOString().replace(/-|:|T|Z|\./g, "");
        const extension = vehicleImage.originalname.split(".").pop();
        const vehiclePath = `vehicles/${vehicleId}/images/${formattedDate}.${extension}`;

        await storage.bucket().file(vehiclePath).save(vehicleImage.buffer);

        const ImageUrl = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${vehiclePath}`;

        await realtimeDB.ref(`vehicles/${vehicleId}`).update({
            locations: locationDatas,
            vehicleInformation: vehicleDatas,
            ImageUrl,
            updatedAt: new Date().toISOString(),
        });

        const partnerVehicleData = {name, type, brand, plateNumber, bpkb, stnk, year, seats, description};
        const partnerVehicleInformation = {cost, location, address};

        await realtimeDB.ref(`partnerVehicles/${uid}/${vehicleId}`).update({
            partnerVehicleData,
            partnerVehicleInformation,
            updatedAt: new Date().toISOString(),
        });

        return vehicleId;
    },

    async delete(uid, vehicleId) {
        const partnerSnapshot = await realtimeDB.ref(`partners/${uid}`).once("value");
        const partner = partnerSnapshot.val();
        if (!partner) {
            throw new Error("Partner not found");
        }

        const vehicleSnapshot = await realtimeDB.ref(`vehicles/${vehicleId}`).once("value");
        const vehicle = vehicleSnapshot.val();
        if (!vehicle) {
            throw new Error("Vehicle not found");
        }

        await realtimeDB.ref(`vehicles/${vehicleId}`).remove();
        await realtimeDB.ref(`partnerVehicles/${uid}/${vehicleId}`).remove();

        return vehicleId;
    },
};


module.exports = partnerVehiclesModel;
