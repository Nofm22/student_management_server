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

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));
app.use("/api/v1", rootRouter);

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
