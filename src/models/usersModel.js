const {auth, realtimeDB} = require("../config");


const usersModel = {
    async create(user) {
        const {name, email, password} = user;
        const usersSnapshot = await realtimeDB.ref("users").orderByChild("email").equalTo(email).once("value");
        const users = usersSnapshot.val();
        if (users) {
            throw new Error("Email already exists");
        }

        const createdUser = await auth.createUser({
            email,
            password,
        });

        await realtimeDB.ref(`users/${createdUser.uid}`).set({
            uid: createdUser.uid,
            fullName: name,
            email,
            role: "Penyewa",
            emailVerified: createdUser.emailVerified,
        });

        return createdUser;
    },

    async read(uid) {
        if (uid) {
            const userSnapshot = await realtimeDB.ref(`users/${uid}`).once("value");
            const user = userSnapshot.val();
            if (!user) {
                throw new Error(`User with id ${uid} not found`);
            }
            return user;
        } else {
            const usersSnapshot = await realtimeDB.ref("users").once("value");
            const users = usersSnapshot.val();
            return users;
        }
    },

    async update(id, user) {
        const {email, name, role} = user;
        await realtimeDB.ref(`users/${id}`).update({
            name,
            email,
            role,
        });
        return {
            message: `User with id ${id} updated successfully`,
        };
    },

    async delete(id) {
        await realtimeDB.ref(`users/${id}`).remove();
        return {
            message: `User with id ${id} deleted successfully`,
        };
    },

    async deleteUserByEmail(email) {
        try {
            const usersSnapshot = await realtimeDB.ref("users").orderByChild("email").equalTo(email).once("value");
            const users = usersSnapshot.val();

            if (!users) {
                throw new Error("User not found");
            }

            const userId = Object.keys(users)[0];
            await realtimeDB.ref(`users/${userId}`).remove();
            return {
                message: `User with email ${email} deleted successfully`,
            };
        } catch (error) {
            throw error;
        }
    },
};


module.exports = usersModel;
