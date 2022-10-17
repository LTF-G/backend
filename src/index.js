const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

// const WebRTCChannelRouter = require("./routes/WebRTCChannel");
const AuthenticateRouter = require("./routes/Auth");
const ChannelRouter = require("./routes/Channel");

require("./models").sequelize.sync();
require("dotenv").config();

const app = express();
const options = {
    key: fs.readFileSync("./keys/key.pem", "utf-8"),
    cert: fs.readFileSync("./keys/cert.pem", "utf-8"),
    passphrase: process.env.HTTPS_PASSPHRASE,
    rejectUnauthorized: false,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    return res.status(200).send({
        message: "Hi there!",
    });
});

// app.use("/channel", WebRTCChannelRouter);
app.use("/auth", AuthenticateRouter);
app.use("/channel", ChannelRouter);
app.user;

const server = https.createServer(options, app);

server.listen(8484, () => {
    console.log("app running on port : 8484");
});
