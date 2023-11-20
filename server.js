require("dotenv").config();
const app = require("./src/app");
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on("error", (err) => {
    console.log("Server Error: ", err.message);
});
