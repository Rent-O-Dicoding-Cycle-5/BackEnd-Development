const {auth, realtimeDB} = require("../config");
const rolesModel = require("./rolesModel");


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

        const createdUser = await auth.createUser({
            email,
            password,
        });

        await realtimeDB.ref(`accounts/${createdUser.uid}`).set({
            uid: createdUser.uid,
            displayName: formattedUsername,
            email,
            emailVerified: createdUser.emailVerified,
            createdAt: new Date().toISOString(),
        });

        const rolesSnapshot = await rolesModel.read(1);
        await realtimeDB.ref(`users/${createdUser.uid}`).set({
            uid: createdUser.uid,
            username: formattedUsername,
            email,
            roles: rolesSnapshot,
        });

        return createdUser;
    },

    async read(uid) {
        if (uid) {
            const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
            const user = userSnapshot.val();
            if (!user) {
                throw new Error("User not found");
            }
            user.roles = user.roles.filter((role) => role !== null);
            return user;
        } else {
            const usersSnapshot = await realtimeDB.ref("users").once("value");
            const users = usersSnapshot.val();
            Object.values(users).forEach((user) => {
                user.roles = user.roles.filter((role) => role !== null);
            });
            return users;
        }
    },

    async update(uid, user) {
        const {fullName, address, dateBirth, role} = user;

        const roleSnapshot = await rolesModel.read(role.id);
        if (!roleSnapshot) {
            throw new Error("Role not found");
        }

        const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
        const userToUpdate = userSnapshot.val();
        if (!userToUpdate) {
            throw new Error("User not found");
        }

        await realtimeDB.ref(`users/${uid}`).update({
            fullName,
            address,
            dateBirth,
            roles: roleSnapshot,
            updatedAt: new Date().toISOString(),
        });
    },
};


module.exports = usersModel;
