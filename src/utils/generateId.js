const generateId = () => {
    const keys = "abcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";
    for (let i = 0; i < 32; i++) {
        id += keys.charAt(Math.floor(Math.random() * keys.length));
    }

    return id;
};


module.exports = generateId;
