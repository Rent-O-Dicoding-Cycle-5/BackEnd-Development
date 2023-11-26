const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const vehicleRoute = require("./routes/vehicleRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/vehicle", vehicleRoute);


module.exports = app;
