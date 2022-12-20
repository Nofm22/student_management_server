const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootRouter = require("./src/routes/index");
const sequelize = require("./src/config/connectDatabase");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");
require("dotenv").config();
let cors = require("cors");
const app = express();
// const corsOptions = {
//     origin: true,
//     credentials: true,
// };
const corsOptions = {
    origin: "https://student-management-4ybj.onrender.com/",
    credentials: true, //access-control-allow-credentials:true
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    maxAge: 600,
    optionSuccessStatus: 200,
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "device-remember-token",
        "Access-Control-Allow-Origin",
        "Origin",
        "Accept",
    ],
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));
app.use("/", rootRouter);

app.get("/", (req, res) => {
    res.send("From ptnm with love!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("Server is running in port: ", PORT);
    try {
        sequelize.authenticate();
        console.log("Connect sucessfully");
    } catch (e) {
        console.log("Connect fail.");
    }
});
