require("dotenv").config();
const {auth, realtimeDB, storage} = require("../config");
const rolesModel = require("./rolesModel");
const bcryptPassword = require("../middleware/bcryptPassword");


const usersModel = {
    async create(user) {
        const {username, email, password} = user;
        const formattedUsername = username.toLowerCase().replace(/\s/g, "");

        const usernameSnapshot = await realtimeDB.ref("accounts").
            orderByChild("username").equalTo(formattedUsername).once("value");
        if (usernameSnapshot.val()) {
            throw new Error("Username already exists");
        }

        const emailSnapshot = await realtimeDB.ref("accounts").
            orderByChild("email").equalTo(email).once("value");
        if (emailSnapshot.val()) {
            throw new Error("Email already exists");
        }

        const hashedPassword = await bcryptPassword.hash(password);
        const createdUser = await auth.createUser({
            email,
            emailVerified: true,
            password: hashedPassword,
            disabled: false,
        });

        await realtimeDB.ref(`accounts/${createdUser.uid}`).set({
            uid: createdUser.uid,
            displayName: formattedUsername,
            email,
            password: hashedPassword,
            emailVerified: createdUser.emailVerified,
            createdAt: new Date().toISOString(),
        });

        const rolesSnapshot = await rolesModel.read(1);
        await realtimeDB.ref(`users/${createdUser.uid}`).set({
            uid: createdUser.uid,
            username: formattedUsername,
            email,
            roles: [rolesSnapshot],
        });

        return createdUser;
    },

    async signIn(user) {
        const {email, password} = user;

        const emailSnapshot = await realtimeDB.ref("accounts").
            orderByChild("email").equalTo(email).once("value");
        const account = emailSnapshot.val();
        if (!account) {
            throw new Error("Email not found");
        }

        const uid = Object.keys(account)[0];
        const accountSnapshot = await realtimeDB.ref(`accounts/${uid}`).once("value");
        const accountData = accountSnapshot.val();
        const comparedPassword = await bcryptPassword.compare(password, accountData.password);
        if (!comparedPassword) {
            throw new Error("Password is wrong");
        }

        const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
        const userData = userSnapshot.val();
        if (!userData) {
            throw new Error("User not found");
        }

        return userData;
    },

    async read(uid) {
        if (uid) {
            const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
            const user = userSnapshot.val();
            if (!user) {
                throw new Error("User not found");
            }
            if (Array.isArray(user.roles) && user.roles.length > 1) {
                user.roles = user.roles.filter((role) => role !== null);
            }
            return user;
        } else {
            const usersSnapshot = await realtimeDB.ref("users").once("value");
            const users = usersSnapshot.val();
            Object.values(users).forEach((user) => {
                if (Array.isArray(user.roles) && user.roles.length > 1) {
                    user.roles = user.roles.filter((role) => role !== null);
                }
            });
            return users;
        }
    },

    async update(uid, user) {
        const {fullName, phoneNumber} = user;

        const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
        const userData = userSnapshot.val();
        if (!userData) {
            throw new Error("User not found");
        }

        await realtimeDB.ref(`users/${uid}`).update({
            fullName,
            phoneNumber,
            updatedAt: new Date().toISOString(),
        });

        return user;
    },

    async uploadImgProfile(uid, imgProfile) {
        if (!imgProfile) {
            throw new Error("Please upload an image");
        }

        const formattedDate = new Date().toISOString().replace(/-|:|T|Z|\./g, "");
        const extension = imgProfile.originalname.split(".").pop();
        const profilePath = `profiles/${uid}/${formattedDate}${Date.now()}.${extension}`;

        await storage.bucket().file(profilePath).save(imgProfile.buffer);

        const urlImage = `https://storage.googleapis.com/${process.env.FIREBASE_STORAGE_BUCKET}/${profilePath}`;
        await realtimeDB.ref(`users/${uid}`).update({urlImage});

        return urlImage;
    },
};


module.exports = usersModel;
